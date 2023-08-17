declare global {
  interface DocumentEventMap {
    "my-custom-event": CustomEvent<{ exampleArg: string }>;
  }
}
