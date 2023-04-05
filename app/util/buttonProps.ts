export function buttonProps<T extends Element>(
  listener: (
    e: React.MouseEvent<T, MouseEvent> | React.KeyboardEvent<T>
  ) => void
) {
  return {
    tabIndex: 0,
    role: "button",
    onClick: listener,
    onKeyPress: (e: React.KeyboardEvent<T>) => {
      if (e.key.toLowerCase() !== "enter") return;
      listener(e as React.KeyboardEvent<T>);
    }
  };
}
