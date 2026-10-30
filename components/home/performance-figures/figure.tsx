type Props = {
  value: string
  displayValue: string
  suffix?: string
  title: string
}

export function Figure({ title, value, displayValue, suffix }: Props) {
  return (
    <div className="performance-figure">
      <span className="sr-only">{value}{suffix ? ` ${suffix}` : ""}</span>
      <div aria-hidden="true" className="text-gray-900 text-3xl lg:text-4xl font-semibold flex items-center">
        <span className="counter-value">
          <span className="counter-reserve">{value}</span>
          <span data-count-to={value}>{displayValue}</span>
        </span>
        <span>{suffix}</span>
      </div>
      <h3 className="text-gray-700 text-sm lg:text-base max-w-48 text-center">
        {title}
      </h3>
    </div>
  )
}
