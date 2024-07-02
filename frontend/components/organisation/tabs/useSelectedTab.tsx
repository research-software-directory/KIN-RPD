// SPDX-FileCopyrightText: 2023 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2023 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import {TabKey, organisationTabItems} from './OrganisationTabItems'
import useOrganisationContext from '../context/useOrganisationContext'

// extract tab items (object keys)
// const tabItems = Object.keys(organisationTabItems) as TabKey[]

export default function useSelectedTab(tab_id: TabKey|null) {
  const {description, isMaintainer} = useOrganisationContext()

  // default tab is projects
  let selected:TabKey = 'projects'

  // if tab provided use it
  if (tab_id !== null && organisationTabItems.hasOwnProperty(tab_id) === true) {
    selected = tab_id
  } else if (organisationTabItems['about'].isVisible({description,isMaintainer})===true) {
    // if tab is not provided and there is description
    // the default tab is about
    selected = 'about'
  }

  return selected
}
