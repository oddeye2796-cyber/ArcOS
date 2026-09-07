import { MouseEvent as ReactMouseEvent, useEffect, useRef } from 'react';

interface ModalDismissOptions {
  /**
   * Blocks Escape and backdrop dismissal while a modal is mid-flight — a
   * deployment or PoC provisioning sequence should not be interruptible by a
   * stray key press.
   */
  locked?: boolean;
}

/**
 * Escape-to-close, backdrop-click-to-close and background scroll locking for a
 * modal. Returns a ref to put on the backdrop element; clicks that originate on
 * the backdrop itself (not on the dialog inside it) dismiss the modal.
 */
export function useModalDismiss<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  onClose: (() => void) | undefined,
  options: ModalDismissOptions = {}
) {
  const { locked = false } = options;
  const backdropRef = useRef<T>(null);

  // Escape key. Bound on the document so it works regardless of focus position.
  useEffect(() => {
    if (!isOpen || locked || !onClose) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, locked, onClose]);

  // Prevent the page behind the modal from scrolling.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  /**
   * Dismiss only when the gesture starts and ends on the backdrop. Using
   * `onClick` alone closes the modal when a text selection that began inside
   * the dialog happens to end on the backdrop.
   */
  const pressedOnBackdrop = useRef(false);

  const onBackdropMouseDown = (event: ReactMouseEvent<T>) => {
    pressedOnBackdrop.current = event.target === backdropRef.current;
  };

  const onBackdropClick = (event: ReactMouseEvent<T>) => {
    const startedOnBackdrop = pressedOnBackdrop.current;
    pressedOnBackdrop.current = false;
    if (locked || !onClose) return;
    if (startedOnBackdrop && event.target === backdropRef.current) {
      onClose();
    }
  };

  return { backdropRef, onBackdropMouseDown, onBackdropClick };
}
