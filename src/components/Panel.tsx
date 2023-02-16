import classNames from 'classnames';

type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
	children?: React.ReactNode;
	className?: string;
};

function Panel({ children, className, ...rest }: PanelProps) {
	const finalClassNames = classNames(
		'border rounded p-3 shadow bg-white w-full',
		className
	);

	return (
		<div {...rest} className={finalClassNames}>
			{children}
		</div>
	);
}

export default Panel;
