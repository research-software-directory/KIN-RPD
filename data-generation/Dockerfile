# SPDX-FileCopyrightText: 2022 - 2023 Ewan Cahen (Netherlands eScience Center) <e.cahen@esciencecenter.nl>
# SPDX-FileCopyrightText: 2022 - 2023 Netherlands eScience Center
#
# SPDX-License-Identifier: Apache-2.0

FROM node:21.4.0-bullseye-slim
WORKDIR /usr/app
# copy
COPY package.json package-lock.json ./
# install
RUN npm install --frozen-lockfile --silent
# copy all files
COPY . .

CMD npx wait-on --timeout 10000 $POSTGREST_URL && node main.js
