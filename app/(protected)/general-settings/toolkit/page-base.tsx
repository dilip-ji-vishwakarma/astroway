/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { JsonViewer } from "@/components/ui/json-tree-viewer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDataMutations } from "../hook/use-data-mutations";

export const PageBase = ({ response }: any) => {
  const { handleChange, updateField, rows, loadingRow } = useDataMutations({
    response,
  });

  return (
    <div className="space-y-8">
      {rows.map((item: any, index: number) => (
        <div key={item.id} className="border p-4 rounded-md space-y-3">
          <h3 className="font-bold text-lg">{item.name}</h3>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label>Description</Label>
            <div className="flex gap-2">
              <Textarea
                value={item.description ?? ""}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />
              <Button
                disabled={loadingRow === item.id}
                onClick={() =>
                  updateField(item.id, "description", item.description)
                }
              >
                {loadingRow === item.id ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>

          {/* VALUE NUMBER */}
          <div className="space-y-2">
            <Label>Value Number</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={item.valueNumber ?? ""}
                onChange={(e) =>
                  handleChange(index, "valueNumber", Number(e.target.value))
                }
              />
              <Button
                disabled={loadingRow === item.id}
                onClick={() =>
                  updateField(item.id, "valueNumber", item.valueNumber)
                }
              >
                {loadingRow === item.id ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>

          {/* VALUE STRING */}
          <div className="space-y-2">
            <Label>Value String</Label>
            <div className="flex gap-2">
              <Input
                value={item.valueString ?? ""}
                onChange={(e) =>
                  handleChange(index, "valueString", e.target.value)
                }
              />
              <Button
                disabled={loadingRow === item.id}
                onClick={() =>
                  updateField(item.id, "valueString", item.valueString)
                }
              >
                {loadingRow === item.id ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>

          {/* VALUE JSON */}
          <div className="space-y-2">
            <Label>Value JSON</Label>

            {/* viewer (for read structured) */}
            <div className="border rounded p-2 mb-2">
              <JsonViewer data={item.valueJson} />
            </div>

            {/* editable textarea */}
            <div className="flex gap-2">
              <Textarea
                className="h-32"
                placeholder="Past JSON"
                onChange={(e) => {
                  handleChange(index, "valueJson", e.target.value);
                }}
              />

              <Button
                disabled={loadingRow === item.id}
                onClick={() => {
                  try {
                    const parsed = JSON.parse(rows[index].valueJson);
                    updateField(item.id, "valueJson", parsed);
                  } catch (e: any) {
                    toast.error("Invalid JSON", e);
                  }
                }}
              >
                {loadingRow === item.id ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
