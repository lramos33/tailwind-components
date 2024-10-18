import { ChangePrimaryColor } from "@/modules/theme/components/change-primary-color";

export default function Page() {
  return (
    <div className="mt-10 space-y-4">
      <ChangePrimaryColor />

      <div className="flex w-fit gap-2 rounded-xl border p-2">
        <div className="size-10 rounded-md bg-primary-25" />
        <div className="size-10 rounded-md bg-primary-50" />
        <div className="size-10 rounded-md bg-primary-100" />
        <div className="size-10 rounded-md bg-primary-200" />
        <div className="size-10 rounded-md bg-primary-300" />
        <div className="size-10 rounded-md bg-primary-400" />
        <div className="size-10 rounded-md bg-primary-500" />
        <div className="size-10 rounded-md bg-primary-600" />
        <div className="size-10 rounded-md bg-primary-700" />
        <div className="size-10 rounded-md bg-primary-800" />
        <div className="size-10 rounded-md bg-primary-900" />
        <div className="size-10 rounded-md bg-primary-950" />
      </div>

      <div className="flex w-fit gap-2 rounded-xl border p-2">
        <div className="size-10 rounded-md bg-bg-primary" />
        <div className="size-10 rounded-md bg-bg-secondary" />
        <div className="size-10 rounded-md bg-bg-tertiary" />
        <div className="size-10 rounded-md bg-bg-quaternary" />
      </div>
    </div>
  );
}
