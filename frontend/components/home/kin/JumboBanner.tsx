// SPDX-FileCopyrightText: 2024 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2024 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import GradientBorderButton from './GradientBorderButton'
import {config} from './config'
const {button} = config

export default function JumboBanner() {
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto p-4  grid lg:grid-cols-[1fr_1fr] gap-8 md:gap-20 lg:my-20 md:px-10">
      {/* Jumbo Text*/}
      <div className="flex flex-col justify-center"
        data-aos="fade" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000"
      >
        <h1 className="text-3xl xl:text-4xl font-rsd-titles font-bold">
          VEDA for climate research
        </h1>
        <p className="mt-8 text-lg">
          VEDA offers an overview of climate related research in the Netherlands. Explore projects and contribute by adding your reseach programme.
        </p>
        <p className="mt-8">
          <GradientBorderButton
            text={button.discover.label}
            url={button.discover.url}
            target={button.discover.target}
          />
        </p>
      </div>
      {/* use image instead of video */}
      <img src="/images/veda-banner.svg" alt="Veda by KIN" />
    </div>
  )
}
