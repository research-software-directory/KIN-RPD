// SPDX-FileCopyrightText: 2024 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2024 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

export default function JumboBanner() {
  return (
    <div className="max-w-screen-xl mx-auto p-4  grid lg:grid-cols-[3fr,2fr] gap-8 md:gap-20 lg:my-20 md:px-10">
      {/* Jumbo Text*/}
      <div className="flex flex-col justify-center"
        data-aos="fade" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000"
      >
        <h1 className="text-3xl xl:text-4xl font-rsd-titles font-bold">
          Accelerating Transitions Together
        </h1>
        <p className="mt-8 text-lg">
          The Netherlands has what it takes to make the major transitions needed for a sustainable future. Civil society players are working hard to change the system. Companies and organisations are taking action, governments are adapting policies and much has been invested in scientific knowledge. However, to prevent the worst climate change, this has to happen faster! This is only possible if knowledge from practice and science cooperate more intensively.
        </p>
        {/* <p>
          The KIN brings all parties together. Together, we want to make a substantial contribution to accelerating the transitions needed to be a sustainable, climate-neutral society by 2050 as soon as possible.
        </p> */}
      </div>

      <iframe
        src="https://www.youtube.com/embed/UxVfwZjGCHI?si=pHraOMBOYR5xt104"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className='rounded-lg w-[28rem] h-[20rem] m-auto xl:w-[32rem] xl:h-[20rem]'
      >
      </iframe>
      {/* Video: it will only load once the page is rendered, and only when the user clicks on play. And it will strea the video after. */}
      {/* <video width="100%"
        height="auto"
        className='rounded-lg'
        controls preload="metadata"
        // poster="/video/rsd-video-cover.webp"
        data-aos="fade" data-aos-delay="100"
        data-aos-duration="600"
        data-aos-easing="ease-in-out">
        <source src="https://www.youtube.com/watch?v=UxVfwZjGCHI" type="video/mp4" />
        <source src="https://www.youtube.com/watch?v=UxVfwZjGCHI" type="video/webm" />
          Your browser does not support HTML5 video.
      </video> */}
    </div>
  )
}
