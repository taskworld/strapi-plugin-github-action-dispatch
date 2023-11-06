import { useState } from "react";

import { useFetchClient } from "@strapi/helper-plugin";

import pluginId from "../../pluginId.json";

export function useCreateRun() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<boolean>(false)

  const { post } = useFetchClient();

  async function fn() {
    try {
      setLoading(true)
      const { data } = await post(`/${pluginId}`)
      setData(data.success)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }

  }

  return [fn, loading, data] as const
}
