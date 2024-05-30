// Copyright 2017-2024 @polkadot/app-coretime authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TabItem } from '@polkadot/react-components/types';

import React, { useRef } from 'react';

import { Tabs } from '@polkadot/react-components';
import { useApi, useWorkloadInfos, useWorkplanInfos } from '@polkadot/react-hooks';

import Overview from './Overview/index.js';
import { useTranslation } from './translate.js';

interface Props {
  basePath: string;
  className?: string;
}

function createItemsRef (t: (key: string, options?: { replace: Record<string, unknown> }) => string): TabItem[] {
  return [
    {
      isRoot: true,
      name: 'overview',
      text: t('Overview')
    }
  ];
}

function BrokerApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const itemsRef = useRef(createItemsRef(t));
  const { api, apiEndpoint, isApiReady } = useApi();
  const workloadInfos = useWorkloadInfos(api, isApiReady);
  const workplanInfos = useWorkplanInfos(api, isApiReady);

  return (
    <main className={className}>
      <Tabs
        basePath={basePath}
        items={itemsRef.current}
      />
      <Overview
        apiEndpoint={apiEndpoint}
        workloadInfos={workloadInfos}
        workplanInfos={workplanInfos}
      />
    </main>
  );
}

export default React.memo(BrokerApp);