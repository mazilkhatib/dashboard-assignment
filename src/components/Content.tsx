import Medias from "@/pages/admin/medias";

interface ContentProps {
  title?: string;
}

export function Content({ title }: ContentProps) {
  return (
    <Medias/>
  );
}
