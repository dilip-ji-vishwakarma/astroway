/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDataMutations } from "../hook/use-data-mutations";
import { usePermission } from "@/src/context/PermissionContext";

export const PageBase = ({ response }: any) => {
  const { handleChange, updateField, rows, loadingRow } = useDataMutations({
    response,
  });

  const { modules, role } = usePermission();
  const canEdit = role === "superadmin" || modules?.["General Settings"]?.edit;

  return (
    <>
      {canEdit && (
        <div className="space-y-8">
          {rows.map((item: any, index: number) => (
            <div key={item.id} className="border p-4 rounded-md space-y-3">
              <h3 className="font-bold text-lg">{item.name}</h3>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={item.description ?? ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Value Number</Label>
                <Input
                  type="number"
                  value={item.valueNumber ?? ""}
                  onChange={(e) =>
                    handleChange(index, "valueNumber", Number(e.target.value))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Value String</Label>
                <Input
                  value={item.valueString ?? ""}
                  onChange={(e) =>
                    handleChange(index, "valueString", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Value JSON</Label>
                <Textarea
                  className="h-32"
                  value={
                    item.valueJson
                      ? typeof item.valueJson === "string"
                        ? item.valueJson
                        : JSON.stringify(item.valueJson, null, 2)
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(index, "valueJson", e.target.value)
                  }
                />
              </div>

              <Button
                disabled={loadingRow === item.id}
                onClick={() => {
                  let parsedJson = item.valueJson;
                  try {
                    parsedJson =
                      typeof item.valueJson === "string"
                        ? JSON.parse(item.valueJson)
                        : item.valueJson;
                  } catch (e: any) {
                    return toast.error("Invalid JSON", e);
                  }

                  updateField(item.id, "allFields", {
                    description: item.description,
                    valueNumber: item.valueNumber,
                    valueString: item.valueString,
                    valueJson: parsedJson,
                  });
                }}
              >
                {loadingRow === item.id ? "Updating..." : "Update"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};