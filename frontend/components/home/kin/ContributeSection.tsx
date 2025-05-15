// SPDX-FileCopyrightText: 2024 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2024 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import GradientBorderButton from './GradientBorderButton'
import {config} from './config'
import HowToUseVeda from '~/assets/HowToUseVeda.svg'

const {button} = config

export default function ContributeSection() {
  return (
    <section
      id="learn-more"
      className="p-5 md:p-10 grid gap-12 grid-cols-1 sm:grid-cols-2 max-w-screen-xl mt-20 mx-auto">
      <div className="relative">
        <HowToUseVeda className="w-[100%]"/>
      </div>
      <div>
        <h2 className="flex justify-center text-3xl lg:text-4xl font-rsd-titles font-bold "
          data-aos="fade" data-aos-duration="400" data-aos-easing="ease-in-out">
          How to use VEDA?
        </h2>
        <p className="text-center text-lg mt-5" data-aos="fade"
          data-aos-delay="100" data-aos-duration="400" data-aos-easing="ease-in-out">
          KIN connects, broadens, deepens, and unlocks knowledge for transitions towards a climate-neutral and climate-resilient society. Do you want to contribute to this as well?
        </p>
        <div
          className="flex flex-wrap justify-center gap-4 p-2 scale-90 mt-5">
          <div className="flex justify-center" data-aos="fade-up" data-aos-duration="600"
            data-aos-easing="ease-in-out">
            <GradientBorderButton
              text={button.contact.label}
              url={button.contact.url}
              target={button.contact.target}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
