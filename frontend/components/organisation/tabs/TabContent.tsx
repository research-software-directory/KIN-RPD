// SPDX-FileCopyrightText: 2023 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2023 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import dynamic from 'next/dynamic'

import logger from '~/utils/logger'
import ContentLoader from '~/components/layout/ContentLoader'
import {TabKey} from './OrganisationTabItems'

// default tab is software
import OrganisationSoftware from '../software'
import useSelectedTab from './useSelectedTab'
// use dynamic imports instead
const AboutOrganisation = dynamic(() => import('../about'),{
  loading: ()=><ContentLoader />
})
const SoftwareReleases = dynamic(() => import('../releases'),{
  loading: ()=><ContentLoader />
})
const OrganisationProjects = dynamic(() => import('../projects'),{
  loading: ()=><ContentLoader />
})
const OrganisationUnits = dynamic(() => import('../units'),{
  loading: ()=><ContentLoader />
})
const OrganisationSettings = dynamic(() => import('../settings'),{
  loading: ()=><ContentLoader />
})

type TabContentProps = {
  tab_id: TabKey|null
}

export default function TabContent({tab_id}: TabContentProps) {
  const select_tab = useSelectedTab(tab_id)
  // tab router
  switch (select_tab) {
    case 'about':
      return <AboutOrganisation />
    // IGNORE software and use projects
    // disable software option, 2024-07-02
    case 'software':
    case 'projects':
      return <OrganisationProjects />
    case 'releases':
      return <SoftwareReleases />
    case 'settings':
      return <OrganisationSettings />
    // disable software option, 2024-07-02
    // case 'software':
    //   return <OrganisationSoftware />
    case 'units':
      return <OrganisationUnits />
    default:
      logger(`Unknown tab_id ${tab_id}...returning default software tab`,'warn')
      // projects as default option, 2024-07-02
      return <OrganisationProjects />
  }
}
