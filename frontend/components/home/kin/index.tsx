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
import Arc from '~/components/home/rsd/arc.svg'
import JumboBanner from './JumboBanner'
import HomepageDivider from './HomepageDivider'
import AboutUsSection from './AboutUsSection'
import OurProgramsSection from './OurProgramsSection'
import ContributeSection from './ContributeSection'

export default function RsdHome() {
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

      <div className="bg-base-800">
        {/* Arc separator  */}
        <Arc className="w-full text-base-100 dark:text-base-900 -translate-y-1"></Arc>
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
        <div className="mt-20"></div>
        <AppFooter />
      </div >
    </div >
  )
}
