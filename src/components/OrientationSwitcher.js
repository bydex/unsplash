import { HorizontalOrientationIcon } from "../assets/icons/HorizontalOrientationIcon";
import { VerticalOrientationIcon } from "../assets/icons/VerticalOrientationIcon";

export function OrientationSwitcher({ className }) {
  return (
    <div className={`flex justify-center gap-5 ${className}`}>
      <button>
        <HorizontalOrientationIcon />
      </button>
      <button>
        <VerticalOrientationIcon />
      </button>
    </div>
  );
}
