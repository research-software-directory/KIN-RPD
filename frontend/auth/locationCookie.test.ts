// SPDX-FileCopyrightText: 2022 Dusan Mijatovic (dv4all)
// SPDX-FileCopyrightText: 2022 dv4all
// SPDX-FileCopyrightText: 2023 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2023 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import {saveLocationCookie} from './locationCookie'

let cookieValue = 'status=active'

beforeAll(() => {
  // Set the initial environment route baseline safely
  history.replaceState(null, '', 'http://localhost/')

  // Mock document.cookie with dynamic getter/setter simulation
  Object.defineProperty(document, 'cookie', {
    configurable: true,
    get() {
      return cookieValue
    },
    set(val) {
      cookieValue = val
    },
  })
})

afterAll(() => {
  // Cleanly restore all custom descriptor overrides
  jest.restoreAllMocks()
})

it('ignores these paths', () => {
  const ignorePath = [
    '/auth',
    '/login',
    '/logout',
    '/login/local',
    '/login/failed'
  ]
  ignorePath.forEach(path => {
    // 💡 Jest 30 Fix: Change pathname via history api instead of direct mutation
    history.replaceState(null, '', path)
    document.cookie = ''
    // call function
    saveLocationCookie()
    // validate
    expect(document.cookie).toEqual('')
  })
})

it('when root write cookie to redirect to projects', () => {
  // Jest 30 Fix: Set path to root safely
  history.replaceState(null, '', '/')

  const expectedCookie = 'rsd_pathname=http://localhost/projects?order=impact_cnt;path=/auth;SameSite=None;Secure'
  document.cookie = ''

  // call function
  saveLocationCookie()

  // validate
  expect(document.cookie).toEqual(expectedCookie)
})

it('when path write cookie to redirect to path', () => {
  const testPath = '/test-path'

  // Jest 30 Fix: Set custom test path safely
  history.replaceState(null, '', testPath)

  const expectedCookie = `rsd_pathname=http://localhost${testPath};path=/auth;SameSite=None;Secure`
  document.cookie = ''

  // call function
  saveLocationCookie()
  // validate
  expect(document.cookie).toEqual(expectedCookie)
})
