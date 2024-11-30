import { ForkServerErrorType } from "@/contracts/schemas/api";
import { isDevEnvironment } from "@/utils/misc";
import crypto from 'crypto';


class ForkError extends Error implements ForkServerErrorType {
    status: number;
    errorId: string;
    uid?: string;
  
    constructor(status: number, message?: string, stack?: string, uid?: string) {
      super();
      this.status = status ?? 500;
      this.errorId = crypto.randomBytes(4).toString("hex");
      this.stack = stack;
      this.uid = uid;
  
      if (isDevEnvironment()) {
        this.message =
          stack ?? ""
            ? String(message) + "\nStack: " + String(stack)
            : String(message);
      } else {
        if ((this.stack ?? "") && this.status >= 500) {
          this.stack = this.message + "\n" + this.stack;
          this.message = "Internal Server Error " + this.errorId;
        } else {
          this.message = String(message);
        }
      }
    }
  }
  
  export default ForkError;