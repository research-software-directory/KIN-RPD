// SPDX-FileCopyrightText: 2022 - 2023 Dusan Mijatovic (dv4all)
// SPDX-FileCopyrightText: 2022 - 2023 dv4all
// SPDX-FileCopyrightText: 2023 - 2024 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2023 - 2024 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import {useEffect} from 'react'

import AOS from 'aos'
/*! purgecss start ignore */
import 'aos/dist/aos.css'

import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import {TopNewsProps} from '~/components/news/apiNews'
import Arc from '~/components/home/rsd/arc.svg'
import StatsSection from './StatsSection'
import JumboBanner from './JumboBanner'
import TopNewsSection from './TopNewsSection'
import HomepageDivider from './HomepageDivider'
import AboutUsSection from './AboutUsSection'
import OurProgramsSection from './OurProgramsSection'


import ContributeSection from './ContributeSection'

export type RsdHomeProps = {
  software_cnt: number,
  open_software_cnt: number,
  project_cnt: number,
  organisation_cnt: number,
  contributor_cnt: number,
  software_mention_cnt: number,
  news: TopNewsProps[]
}

export default function RsdHome({
  project_cnt, organisation_cnt,
  contributor_cnt, software_mention_cnt,news
}: RsdHomeProps) {
  // Initialize AOS library
  useEffect(() => {
    AOS.init({offset: 16})
  }, [])

  return (
    <div className="bg-base-100 dark:bg-base-900 dark:text-base-100" data-testid="kin-home-page">
      {/* Header  */}
      <AppHeader />

      {/* Jumbo Banner  */}
      <JumboBanner />

      {/* KIN stats  */}
      <StatsSection
        project_cnt={project_cnt}
        organisation_cnt={organisation_cnt}
        contributor_cnt={contributor_cnt}
        software_mention_cnt={software_mention_cnt}
      />

      <div className="bg-base-800">
        {/* Arc separator  */}
        <Arc className="w-full text-base-100 dark:text-base-900 -translate-y-1"></Arc>
        {/* Get started section  */}
        {/* <GetStartedSection /> */}
        {/* Top news items, ONLY if there are some */}
        <TopNewsSection news={news} />
        {/*  Divider  */}
        <HomepageDivider />
        {/* Our Programs Section */}
        <OurProgramsSection />
        {/*  Divider  */}
        <HomepageDivider />
        {/* Contribute section  */}
        <ContributeSection />
        {/*  Divider  */}
        <HomepageDivider />
        {/* About us section  */}
        <AboutUsSection />
        {/*  Divider  */}
        {/* <HomepageDivider /> */}
        {/* Logos  */}
        {/* <LogoSection /> */}
        {/* Footer */}
        <div className="mt-20"></div>
        <AppFooter />
      </div >
    </div >
  )
}