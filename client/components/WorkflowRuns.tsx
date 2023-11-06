import { Table, Thead, Tbody, Tr, Td, Th, Typography } from '@strapi/design-system';

import type { WorkflowRun } from "../types";

type WorkflowRunsProps = { runs: WorkflowRun[] }

const regExp = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/g;

function getInitiator(runName: string) {
  const [email] = runName.match(regExp) ?? [];
  return email
}

export default function WorkflowRuns({ runs }: WorkflowRunsProps) {
  console.log({ runs })
  return (
    <Table style={{ width: '100%' }}>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">ID</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Date</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Initiator</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Status</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Conclusion</Typography>
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {runs.map(run => (
          <Tr key={run.id}>
            <Td>
              <Typography textColor="neutral800">{run.id}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{run.run_started_at}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{getInitiator(run.name) ?? 'unknown'}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{run.status}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{run.conclusion}</Typography>
            </Td>
          </Tr>
          ))}
      </Tbody>
    </Table>
  )
}
