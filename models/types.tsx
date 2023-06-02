import WizardField from "./WizardField";

export type WizardCallback = (
  result: WizardField[][],
  loadingTextCallback: (text: string) => void,
  finishLoadingCallback: () => void
) => void;
