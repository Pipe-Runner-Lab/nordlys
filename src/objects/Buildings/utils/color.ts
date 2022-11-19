export function getColor(
  isSelected: boolean,
  isBlocked: boolean,
  placementMode: boolean
): string | undefined {
  if (isSelected || placementMode) {
    return 'yellow';
  }

  if (isBlocked) {
    return 'red';
  }
}
