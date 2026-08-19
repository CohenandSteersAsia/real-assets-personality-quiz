interface ProgressProps {
  current: number;
  total: number;
}

export function Progress({ current, total }: ProgressProps) {
  const value = Math.round((current / total) * 100);
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>
          Question {current} of {total}
        </span>
        <span aria-hidden="true">{value}%</span>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={`Question ${current} of ${total}`}
      >
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
