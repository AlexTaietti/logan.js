/**
* Class used to make logging statements colorful and hopefully easier to follow.
*/
class Logger {

   private readonly palette = {

      reset: "\x1b[0m",
      bright: "\x1b[1m",
      dim: "\x1b[2m",
      underscore: "\x1b[4m",
      blink: "\x1b[5m",
      reverse: "\x1b[7m",
      hidden: "\x1b[8m",

      fg: {
         black: "\x1b[30m",
         red: "\x1b[31m",
         green: "\x1b[32m",
         yellow: "\x1b[33m",
         blue: "\x1b[34m",
         magenta: "\x1b[35m",
         cyan: "\x1b[36m",
         white: "\x1b[37m",
         crimson: "\x1b[38m"
      },

      bg: {
         black: "\x1b[40m",
         red: "\x1b[41m",
         green: "\x1b[42m",
         yellow: "\x1b[43m",
         blue: "\x1b[44m",
         magenta: "\x1b[45m",
         cyan: "\x1b[46m",
         white: "\x1b[47m",
         crimson: "\x1b[48m"
      }

   };

   loggerLabel?: string;

   constructor(loggerLabel?: string) {
      if (!loggerLabel) return;
      const prefixString = this.makeMagenta(`[${loggerLabel}]`);
      this.loggerLabel = `${prefixString} `;
   }

   public log(message: string | number) { console.log(this.loggerLabel ? `${this.loggerLabel}${message}` : message); }

   public logError(message: string | number) { this.log(this.makeRed(message)); }
   public logUpdate(message: string | number) { this.log(this.makeYellow(message)); }
   public logSuccess(message: string | number) { this.log(this.makeGreen(message)); }

   public makeGreenInErrorMessage(s: string | number) { return `${this.palette.fg.green}${s}${this.palette.fg.red}`; }
   public makeCyanInErrorMessage(s: string | number) { return `${this.palette.fg.cyan}${s}${this.palette.fg.red}`; }
   public makeYellowInErrorMessage(s: string | number) { return `${this.palette.fg.yellow}${s}${this.palette.fg.red}`; }

   public makeCyanInSuccessMessage(s: string | number) { return `${this.palette.fg.cyan}${s}${this.palette.fg.green}`; }
   public makeRedInSuccessMessage(s: string | number) { return `${this.palette.fg.red}${s}${this.palette.fg.green}`; }
   public makeYellowInSuccessMessage(s: string | number) { return `${this.palette.fg.yellow}${s}${this.palette.fg.green}`; }

   public makeRed(s: string | number) { return `${this.palette.fg.red}${s}${this.palette.reset}`; }
   public makeYellow(s: string | number) { return `${this.palette.fg.yellow}${s}${this.palette.reset}`; }
   public makeGreen(s: string | number) { return `${this.palette.fg.green}${s}${this.palette.reset}`; }
   public makeMagenta(s: string | number) { return `${this.palette.fg.magenta}${s}${this.palette.reset}`; }
   public makeCyan(s: string | number) { return `${this.palette.fg.cyan}${s}${this.palette.reset}`; }

   public extractModifiersFromString(logString: string):  RegExpMatchArray | null {
      const modifier_regex = /(?<=\x1b\[)\d*(?=m)/g;
      const modifiers = logString.match(modifier_regex);
      return modifiers;
   }

}

export default Logger;