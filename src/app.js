import {DayPilot} from "@daypilot/daypilot-lite-javascript";

const dp = new DayPilot.Navigator("dp", {
  cellWidth: 40,
  cellHeight: 40,
  freeHandSelectionEnabled: true,
  eventEndSpec: "Date",
  onBeforeCellRender: (args) => {
    const list = args.cell.events.all();
    const day = args.cell.day;

    const startHere = list.some(e => e.start() === day);
    const endHere = list.some(e => e.end() === day);
    const full = list.some(e => e.start() !== day && e.end() !== day);

    args.cell.cssClass =
      full || (startHere && endHere) ? "full" :
        startHere ? "start" :
          endHere ? "end" :
            null;
  }
});
dp.init();

const app = {
  init() {
    const events = [
      {
        start: DayPilot.Date.today().firstDayOfWeek().addDays(1),
        end: DayPilot.Date.today().firstDayOfWeek().addDays(2),
        resource: "A",
        id: 1,
        text: "Reservation 1"
      },
      {
        start: DayPilot.Date.today().firstDayOfWeek().addDays(4),
        end: DayPilot.Date.today().firstDayOfWeek().addDays(11),
        resource: "A",
        id: 2,
        text: "Reservation 2"
      },
    ];
    dp.update({events});
  }
};
app.init();
