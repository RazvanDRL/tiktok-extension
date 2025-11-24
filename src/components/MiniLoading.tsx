export default function MiniLoading({ className }: { className?: string }) {
    return (
        <div
            className={`animated-spinner rounded-full ${className ? className : "h-6 w-6"
                }`}
        ></div>
    );
}