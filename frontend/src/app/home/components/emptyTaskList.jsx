import Image from "next/image";

export default function EmptyTaskList() {
    return (
        <div className="mx-25 mt-10 w-[74vw] h-[40vh] p-5 flex flex-col items-center justify-between">
            <Image src="/empty.png" alt="No Tasks" width={200} height={50} />
            <p className="text-4xl text-black text-center">Catch every thought before it runs away. <br />We've got the net.</p>
        </div>
    );
}
