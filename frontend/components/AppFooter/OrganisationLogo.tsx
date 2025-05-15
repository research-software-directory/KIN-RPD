// SPDX-FileCopyrightText: 2022 Dusan Mijatovic (dv4all)
// SPDX-FileCopyrightText: 2022 dv4all
//
// SPDX-License-Identifier: Apache-2.0

import {RsdHost} from '~/config/rsdSettingsReducer'
import LogoAvatar from '../layout/LogoAvatar'


export default function OrganisationLogo({host}: { host: RsdHost }) {
  if (host?.logo_url && host?.website) {
    const {name,logo_url,website}=host
    return (
      <a href={website} target="_blank" rel="noreferrer">
        <LogoAvatar
          name={name}
          src={logo_url}
        />
      </a>
    )
  }
  if (host?.logo_url) {
    const {name,logo_url}=host
    return (
      <LogoAvatar
        name={name}
        src={logo_url}
      />
    )
  }
  return null
}
