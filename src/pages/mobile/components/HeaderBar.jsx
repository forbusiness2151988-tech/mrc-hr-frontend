import Icon from "./Icon";

export default function HeaderBar({ user, onBellClick, title, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3">
      <div className="flex items-center gap-3">
        {onBack ? (
          <button onClick={onBack} className="text-ink-700 -ml-1 p-1">
            <Icon name="chevronLeft" size={22} />
          </button>
        ) : (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-11 w-11 rounded-full object-cover border border-ink-100"
          />
        )}
        <div>
          {title ? (
            <span className="text-base font-semibold text-ink-900">{title}</span>
          ) : (
            <>
              <p className="text-sm text-ink-400 leading-none">Hi {user.name.split(" ")[0]} 👋</p>
              <p className="text-base font-semibold text-ink-900 mt-1">{user.role}</p>
            </>
          )}
        </div>
      </div>
      <button
        onClick={onBellClick}
        className="relative h-10 w-10 flex items-center justify-center rounded-full bg-ink-50 text-ink-700"
      >
        <Icon name="bell" size={19} />
        {user.unreadNotifications > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
            {user.unreadNotifications}
          </span>
        )}
      </button>
    </div>
  );
}
