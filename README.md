# ui-io-bus

Experiment into using @Input and @Output as a bus to reduce template footprint and make state composable

## Todo

1. Load dummy books at start
2. Add selected book record to form as extra input
3. Add custom behaviour input to checkbox

## Ideas

- Event Object - Class or Interface
  - Event defs like actions?
  - How else to strongly type?
- Unpacker for
  - inputsBus$
  - inputsBus - no stream
  - throw if no callback
- outputsBus handler
  - callback array
  - update observable
  - throw if no callback unless update observable is set
- Logger
  - Styled console logs
- RxJs operators
  - filter events
  - stream logger
- Filter in container
- Filter in presenter component
- Loopback helper
  - convert specified Output events to typed Inputs stream
