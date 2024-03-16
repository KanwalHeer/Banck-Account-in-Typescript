//                            "BANK ACCOUNT MINI PROJECT"
//import inquirer for user input and chalk for color your output
import inquirer from "inquirer";
import chalk from "chalk";

//i created a class for the blueprint to our object in which i creat three functions one is
//for debit amout, second is for credit amount and third one is for getting total balance
class BankAccount {
  private accountNumber: number;
  private balance: number;

  constructor(accountNumber: number, initialBalnce: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalnce;
  }

  debit(amount: number): void {
    if (amount > 0 && this.balance >= amount) {
      this.balance -= amount;
      console.log(
        chalk.green(
          `You Debited ${amount} from your Account and now your remaining balance is ${this.balance}`
        )
      );
    } else {
      console.log(chalk.red("Invalid debit amount or insufficient funds."));
    }
  }

  credit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(
        chalk.green(
          `You credited ${amount} in your Account and now your new balance is ${this.balance}`
        )
      );
    } else {
      console.log(chalk.red("Invalid credit amount."));
    }
  }

  getTotalBalance(): number {
    return this.balance;
  }
}

//then i created a main function in which i used inquirer prompr for getting user's acount number and
//initial balance;
async function main() {
  const getUserInput = await inquirer.prompt([
    {
      name: "accountNumber",
      type: "number",
      message: "Enter your acount number",
    },
    {
      name: "initialBalance",
      type: "number",
      message: "Enter your initail balance",
    },
  ]);

  const initialBalance = parseFloat(getUserInput.accountNumber);
  const accountNumber = parseFloat(getUserInput.initialBalance);

  // here i created instace of class bankacount;
  const account = new BankAccount(initialBalance, accountNumber);

  let choice: string;
  //then i put do while loop for geeting input from user one by one
  do {
    const response = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.bold("choose an action"),
        choices: ["Debit", "Credit", "Get total balance", "Exit"],
      },
    ]);

    choice = response.choice;
    switch (choice) {
      case "Debit":
        const debitAmount = await inquirer.prompt({
          type: "input",
          name: "debitAmount",
          message: chalk.bold("Enter Amount to debit"),
        });
        account.debit(parseFloat(debitAmount.debitAmount));
        break;

      case "Credit":
        const creditAmount = await inquirer.prompt({
          type: "input",
          name: "creditAmount",
          message: chalk.bold("Enter Amount to Credit"),
        });
        account.credit(parseFloat(creditAmount.creditAmount));
        break;

      case "Get total balance":
        console.log(
          chalk.magenta(`Total balance is ${account.getTotalBalance()}`)
        );
        break;

      case "Exit":
        console.log(chalk.yellow(`Exiting.....`));
        break;

      default:
        console.log(chalk.red("Invalid choice. Please choose again."));
        break;
    }
  } while (choice !== "Exit");
}
//at the end i call my main function
main();
