import { useRef, useState } from "react";
import { UploadIcon } from "@sanity/icons/Upload";
import { Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { set, type ArrayOfObjectsInputProps } from "sanity";
import { markdownToPortableText } from "../lib/markdownToPortableText";

/** Body field with an "Import from Markdown" button above the editor. The imported content stays fully editable below. */
export function MarkdownImportInput(props: ArrayOfObjectsInputProps) {
  const { renderDefault, onChange, value, readOnly } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ tone: "positive" | "critical" | "caution"; text: string } | null>(null);

  const hasContent = (value ?? []).some((b) => {
    const block = b as { _type: string; children?: { text?: string }[] };
    return block._type !== "block" || (block.children ?? []).some((c) => (c.text ?? "").trim());
  });

  async function handleFile(file: File) {
    try {
      const { blocks, skippedImages } = markdownToPortableText(await file.text());
      if (!blocks.length) {
        setStatus({ tone: "critical", text: `No content found in ${file.name}.` });
        return;
      }
      if (hasContent && !window.confirm("Replace the current body with the imported file? You can undo with Ctrl/Cmd+Z.")) return;
      onChange(set(blocks));
      setStatus({
        tone: skippedImages ? "caution" : "positive",
        text: `Imported ${blocks.length} blocks from ${file.name}.${skippedImages ? ` ${skippedImages} image${skippedImages === 1 ? "" : "s"} skipped: add images with the Image button in the editor.` : ""}`,
      });
    } catch {
      setStatus({ tone: "critical", text: "Could not read that file. Use a .md or .txt Markdown file." });
    }
  }

  return (
    <Stack space={3}>
      <Flex align="center" gap={3} wrap="wrap">
        <input
          ref={fileInput}
          type="file"
          accept=".md,.markdown,.txt,text/markdown,text/plain"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void handleFile(file);
          }}
        />
        <Button icon={UploadIcon} text="Import from Markdown" mode="ghost" tone="primary" fontSize={1} disabled={readOnly} onClick={() => fileInput.current?.click()} />
        <Text size={1} muted>
          Headings, lists, tables, bold, italic and links are converted. Edit the result below.
        </Text>
      </Flex>
      {status ? (
        <Card padding={3} radius={2} tone={status.tone}>
          <Text size={1}>{status.text}</Text>
        </Card>
      ) : null}
      {renderDefault(props)}
    </Stack>
  );
}
