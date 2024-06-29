// SPDX-FileCopyrightText: 2024 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2024 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/legacy/image'
import GradientBorderButton from './GradientBorderButton'
import {config} from './config'

const {button} = config

export default function ContributeSection() {
  return (
    <section
      id="learn-more"
      className="p-5 md:p-10 grid gap-12 grid-cols-1 sm:grid-cols-2 max-w-screen-xl mt-20 mx-auto">
      <div className="relative">
        <div
          className='sm:absolute top-0 lg:-top-10 xl:-top-20 left-0 z-0'
        >
          <Image
            src="/images/uniting-the-world-to-tackle-climate-change.webp"
            width="1100"
            height="800"
            layout="intrinsic"
            alt="rsd-illustration"
            style={{
              borderRadius:'50%'
            }}
          />
        </div>
      </div>
      <div>
        <h2 className="flex justify-center text-3xl lg:text-4xl font-rsd-titles font-bold "
          data-aos="fade" data-aos-duration="400" data-aos-easing="ease-in-out">
          Do You Want to Contribute?
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
          {/* <div className="flex justify-center" data-aos="fade-up" data-aos-duration="600"
            data-aos-delay="100"
            data-aos-easing="ease-in-out">
            <GradientBorderButton
              text={button.docs.label}
              url={button.docs.url}
              target={button.docs.target}
            />
          </div>
          <div className="flex justify-center" data-aos="fade-up" data-aos-duration="600"
            data-aos-delay="200"
            data-aos-easing="ease-in-out">
            <GradientBorderButton
              text={button.faq.label}
              url={button.faq.url}
              target={button.faq.target}
            />
          </div> */}
        </div>
      </div>
    </section>
  )
}
