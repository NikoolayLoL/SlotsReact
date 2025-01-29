# React + TypeScript + Vite

Slots with weighted values made with ChatGpt and personal recommendations.

The project is responsive and supports a wide range of devices.

A nice project that showcases how a simple slotmachine works.

# useSlotLogic
- handles the drop rates and the winning logic
# SlotMachine
renders the whole App:
- debug bar
- slot machine
- menu with toggles below
# SlotReel
- handles the symbols that are shown
# Known bugs
Sometimes wild combos can be overloaded and the extra combos are not counted.
This could happen due to a previous bug fix, where multi combos caused small combos to be counted as well. If you have X X X X you would count it as a 4 of X not 3 X and 3 X (**X X X** X and X **X X X**).
In V2 when I write everything myself from scratch with this app as a reference, I will try to make a better algorithm. Currently I tested 2 algorithms:
- One where you check Row by Row, Column by Column and Diagonals both Left to right and the opposite. Issues arose quite often.
- And the current one where you check symbol by symbol for it's neighbors. We log each win combo and then display it at the end. We don't want to recheck winning combos once we move forward with a new symbol. It's like bubble sort with extra steps and the condition that we wouldn't want to check a neighbor, if they are already part of a previous combo with the current element.
