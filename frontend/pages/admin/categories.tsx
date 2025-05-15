// SPDX-FileCopyrightText: 2024 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2024 Ewan Cahen (Netherlands eScience Center) <e.cahen@esciencecenter.nl>
// SPDX-FileCopyrightText: 2024 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import Head from 'next/head'

import {app} from '~/config/app'
import DefaultLayout from '~/components/layout/DefaultLayout'
import AdminPageWithNav from '~/components/admin/AdminPageWithNav'
import {adminPages} from '~/components/admin/AdminNav'
import AdminCategories from '~/components/admin/categories'

// disable categories option, 2024-07-02
// change this to categories when enabled
const pageTitle = `${adminPages['pages'].title} | Admin page | ${app.title}`

export default function AdminCategoriesPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>{pageTitle}</title>
      </Head>pages
      <AdminPageWithNav title={adminPages['pages'].title}>
        <AdminCategories />
      </AdminPageWithNav>
    </DefaultLayout>
  )
}
