const nope = "";
const noop = (...args: any[]): void => {};

export const PUSH_STATE_EVENT = "pushstate";
export const POP_STATE_EVENT = "popstate";
export const LEFT_CLICK_CODE = 0;

export const navigate = (href: string) => {
  window.history.pushState({}, nope, href);
  const navigationEvent = new Event(PUSH_STATE_EVENT);
  window.dispatchEvent(navigationEvent);
};

export function Link({ target, to, ...props }: any) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isMainEvent = event.button === LEFT_CLICK_CODE;
    const isModifiedEvent = !!(
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    );
    const isManageableEvent = target === undefined || target === "_self";
    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to);
    }
  };
  return <a onClick={handleClick} href={to} target={target} {...props}></a>;
}
