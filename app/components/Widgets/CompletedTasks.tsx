export function CompletedTasks() {
  return (
    <div className="w-full border-2 border-highlight rounded-md p-8 bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <p className="font-extrabold text-xl mb-2">
            Great, your progress is almost done!
          </p>
          <span className="font-semibold text-sm">4 of 7 completed</span>
        </div>
        <div className="w-full flex justify-end">
          <div className="rounded-full w-36 h-36 relative">
            <div className="rounded-full absolute inset-[-0.5rem] bg-conic-gradient" />
            <div className="rounded-full absolute inset-[0.3rem] bg-slate-900" />
            <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-extrabold text-highlight text-4xl">
              58%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
