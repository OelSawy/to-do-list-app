export default function ProgressBar({ progress }) {
    return (
        <div className="mx-25 mt-10 w-[74vw] h-[18vh] p-5 flex flex-col justify-between bg-[var(--progress-bg)] rounded-xl">
            <div className="flex flex-col">
                <span className="text-gray-400 text-2xl text-start mb-2">Your Progress</span>
                <span className="text-black text-4xl text-start">{100 - progress}% remaining to complete</span>
            </div>
            <div className="w-full bg-[var(--progress-bar-bg)] rounded-full">
                <div className="bg-[var(--progress-bar)] h-6 rounded-full" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}
