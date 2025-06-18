import "./style.scss";

export function Spinner({
	isLoading,
	isComplete,
}: {
	isLoading?: boolean;
	isComplete: boolean;
}) {
	return (
		<div className={`${isLoading ? "" : "hidden"}`}>
			<div className={`circle-loader ${isComplete ? "load-complete" : ""}`}>
				{isComplete && <div className="checkmark draw"></div>}
			</div>
		</div>
	);
}
