import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 300000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  describe('summary command prints ', () => {
    it('prints the list of components found in nordnet-ui-kit example', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/repos/nordnet-ui-kit', params: [
          'summary',
          '--config="../../configs/nordnet-ui-kit-uxpin.config.js"',
        ],
      })
        .then((output) => {
          // then
          expect(output).toContain(
            `Uncategorized

    Alert
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Animate
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Avatar
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Badge
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Button
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Dropdown
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Flag
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Icon
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Input
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    LabeledValue
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Li
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Logo
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Pane
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    RadioGroup
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    SegmentedControl
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Spinner
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Table
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Tbody
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Td
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Tfoot
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Th
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Thead
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Tooltip
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    Tr
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Ul
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘`);
        });
    });
  });
});
