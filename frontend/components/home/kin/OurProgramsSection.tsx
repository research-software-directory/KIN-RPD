// SPDX-FileCopyrightText: 2024 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2024 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import LandingPageCiteIcon from '~/components/icons/LandingPageCiteIcon.svg'
import LandingPageShowIcon from '~/components/icons/LandingPageShowIcon.svg'
import LandingPageShareIcon from '~/components/icons/LandingPageShareIcon.svg'
import LandingPageImpactIcon from '~/components/icons/LandingPageImpactIcon.svg'

export default function OurProgramsSection() {
  return (
    <section
      id="our-goals"
      className="p-5 md:p-10 w-full max-w-screen-xl mx-auto">
      <h2
        className="flex justify-start text-3xl lg:text-4xl font-rsd-titles font-bold mt-6"
        data-aos="fade" data-aos-duration="400" data-aos-easing="ease-in-out">
          Our Programs
      </h2>

      <div className="grid gap-20 grid-cols-1 md:grid-cols-2 pt-14">
        <article className="flex gap-4 items-start" data-aos="fade" data-aos-delay="0">
          <LandingPageImpactIcon className="h-auto mr-5 pt-1 scale-125 flex-shrink-0" />
          <div>
            <h3 className="mb-4 text-2xl font-medium">Netherlands Work Programs</h3>
            <p className="text-lg opacity-70">
              KIN’s work programmes focus on accelerating systemic transitions. Applying a systemic lens, we look at the connection between sub-problems. This provides long-term action perspectives. To this end, we work in co-creation, with different types of actors from different disciplines. Our work programmes bring knowledge and practice together and are therefore mission-driven.
            </p>
          </div>
        </article>
        <article className="flex gap-4 items-start" data-aos="fade" data-aos-delay="100">
          <LandingPageCiteIcon className="h-auto mr-5 pt-1 flex-shrink-0" />
          <div>
            <h3 className="mb-4 text-2xl font-medium">
              Global Transitions
            </h3>
            <p className="text-lg opacity-70">
              Climate change is a global problem, requiring global solutions. With the Paris Agreement, the countries that emit the most CO2 have committed to support countries that suffer the most. The KIN underlines the importance of this commitment. With the Global Transitions (GT) programme, we focus on accelerating local transitions in those countries that have contributed least to climate change but are most vulnerable to its impacts.
            </p>
          </div>
        </article>
        <article className="flex gap-4 items-start" data-aos="fade" data-aos-delay="0">
          <LandingPageShowIcon className="h-auto mr-5 pt-1 flex-shrink-0" />
          <div>
            <h3 className="mb-4 text-2xl font-medium">
              Events
            </h3>
            <p className="text-lg opacity-70">
              KIN, together with the Pact and/or partners, regularly organizes activities that bring together research and practice.
            </p>
          </div>
        </article>
        <article className="flex gap-4 items-start" data-aos="fade" data-aos-delay="100">
          <LandingPageShareIcon className="h-auto mr-5 pt-1 flex-shrink-0 scale-105" />
          <div>
            <h3 className="mb-4 text-2xl font-medium">
              Short-Term Programs
            </h3>
            <p className="text-lg opacity-70">
              In addition to larger work programs, KIN also focuses on short-term programs that can achieve quick results.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
