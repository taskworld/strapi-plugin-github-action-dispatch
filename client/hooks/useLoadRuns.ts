import { useState } from "react";

import { useFetchClient } from "@strapi/helper-plugin";

import pluginId from "../../pluginId.json";

import type { WorkflowRun } from "../types";

export function useLoadRuns() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WorkflowRun[]>([])

  const { get } = useFetchClient();

  async function fn() {
    try {
      setLoading(true)
      const { data } = await get(`/${pluginId}`)
      setData(data.workflow_runs)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return [fn, loading, data] as const
}
