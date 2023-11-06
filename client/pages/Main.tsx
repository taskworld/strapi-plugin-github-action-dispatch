import { useEffect } from "react";

import {
  Button,
  ContentLayout,
  Flex,
  HeaderLayout,
  Main,
} from "@strapi/design-system";

import { Plus, Refresh } from "@strapi/icons";

import { SettingsPageTitle } from "@strapi/helper-plugin";

import { useCreateRun, useLoadRuns } from '../hooks'

import WorkflowRuns from "../components/WorkflowRuns";

export default function() {
  const [loadRuns, getting, runs] = useLoadRuns();
  const [createRun, posting] = useCreateRun();

  useEffect(() => {
    loadRuns()
  }, [])


  return (
    <Main>
      <SettingsPageTitle name="Deployment requests" />
      <HeaderLayout
        title="Deployment requests"
        subtitle="Inspect current deployment status and request a new deployment"
        primaryAction={(
          <Button
            startIcon={<Plus />}
            disabled={posting}
            loading={posting}
            onClick={() => createRun().then(loadRuns)}
          >New deployment</Button>
        )}
        secondaryAction={(
          <Button
            variant="tertiary"
            startIcon={<Refresh />}
            disabled={getting}
            loading={getting}
            onClick={loadRuns}
          >Refresh</Button>
        )}
      />

      <ContentLayout>
        <Flex direction="column" alignItems="stretch" gap={6}>
          <WorkflowRuns runs={runs} />
        </Flex>
      </ContentLayout>
    </Main>
  );
}
