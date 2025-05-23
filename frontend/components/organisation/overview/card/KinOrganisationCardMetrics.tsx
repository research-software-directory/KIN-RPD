// SPDX-FileCopyrightText: 2023 Dusan Mijatovic (Netherlands eScience Center)
// SPDX-FileCopyrightText: 2023 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

export default function KinOrganisationCardMetrics({project_cnt}:{project_cnt:number|null}) {
  return (
    <>
      {/* Counter */}
      <div>
        <div className='text-5xl font-light'>
          {project_cnt ?? 0}
        </div>
        <div className='text-center text-sm'>
          research <br />project{project_cnt === 1 ? '' : 's'}
        </div>
      </div>
    </>
  )
}
