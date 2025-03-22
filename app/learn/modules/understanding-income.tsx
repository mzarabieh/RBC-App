import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const IncomeTypesSection = () => (
  <div className="space-y-4">
    <p>
      Imagine you're at your favorite snack store, eyeing all the chips, drinks, and candy. You prepare the amount of
      cash you think you might need to buy all your favourite snacks only to find out that with taxes and discounts, the
      price on the shelf isn't what you actually pay. That's the same deal with income—what you see isn't always what
      you get.
    </p>
    <p>Let's break it down snack-style!</p>

    <h2 className="text-2xl font-bold">1. Types of Income: How You Stock Up Your Snack Fund</h2>
    <p>Your income is the money you earn to buy those snacks:</p>

    <h3 className="font-bold text-xl">Employment Income (aka "The Weekly Allowance")</h3>
    <p>
      This is the money you get regularly from a part-time job or another steady gig. Just like an allowance, you know
      it's coming at the same time every week or month. Bonus: Sometimes it comes with perks, like an employee discount
      or health benefits (free snacks, anyone?).
    </p>
    <Alert>
      <AlertTitle>Resource Tip</AlertTitle>
      <AlertDescription>
        If you are currently looking for this source of income, we highly recommend visiting York University's Career
        Centre, which is located at McLaughlin Rd, Toronto, ON M7A 2C5 or{" "}
        <Link href="https://careers.yorku.ca/" className="text-blue-600 hover:underline" target="_blank">
          book an appointment online <ExternalLink className="h-3 w-3 inline" />
        </Link>
      </AlertDescription>
    </Alert>

    <h3 className="font-bold text-xl">Freelance Income (aka "The Hustler Money")</h3>
    <p>
      This is the cash you earn doing side gigs—like selling handmade bracelets, babysitting, or tutoring. Payments are
      made depending on how many hours you put in. It's like hustling snacks for extra change at lunch.
    </p>
    <Alert>
      <AlertTitle>Resource Tip</AlertTitle>
      <AlertDescription>
        And if you want someone to share your crafty interests with, you should check out some of the clubs and
        organizations at YorkU on{" "}
        <Link href="https://yorku.campuslabs.ca/engage/" className="text-blue-600 hover:underline" target="_blank">
          YU Connect <ExternalLink className="h-3 w-3 inline" />
        </Link>
        —which would definitely have a handmade bracelet club somewhere!
      </AlertDescription>
    </Alert>

    <h3 className="font-bold text-xl">Bursaries</h3>
    <p>Bursaries, scholarships, and grants are not taxable if:</p>
    <p>You are enrolled full-time in a qualifying educational program at a designated educational institution.</p>
    <p>Bursaries may be taxable if: You are not considered a full-time student.</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>The bursary exceeds the costs of tuition, books, and education-related expenses.</li>
      <li>It is provided as a work-related benefit (e.g., employer-sponsored funding).</li>
      <li>The amount received is for education-related expenses.</li>
    </ul>
    <Alert>
      <AlertTitle>Resource Tip</AlertTitle>
      <AlertDescription>
        For more information about receiving a bursary, scholarship or grants at York University, please visit the
        student financial services (SFS){" "}
        <Link href="https://sfs.yorku.ca/" className="text-blue-600 hover:underline" target="_blank">
          online <ExternalLink className="h-3 w-3 inline" />
        </Link>
        , or in person at the Bennett Centre located at 99 Ian Macdonald Blvd, Toronto, ON M3J 1P3
      </AlertDescription>
    </Alert>

    <h3 className="font-bold text-xl">Passive Income (aka "The Snack Machine Money")</h3>
    <p>
      Imagine you own a vending machine. Once it's set up, it keeps earning you cash every time someone buys a snack.
      That's passive income—money that comes in while you chill. Examples include renting out property or earning
      royalties from something you created. Passive income can also be earned from investments which we will cover in
      Chapter 6.
    </p>
  </div>
)

export const PropertyIncomeSection = () => (
  <div className="space-y-4">
    <p>Property Income includes Rental Income, Capital Gains and Dividend Income</p>

    <h3 className="font-bold text-xl">1. Rental Income – The Extra Shelf Space</h3>
    <p>
      Imagine you run a small snack shop with limited space. You decide to rent out one of your shelves to another
      vendor. Every time they sell a snack, you get paid. That's like rental income—you own the space, and someone else
      pays to use it.
    </p>
    <p>
      But just like running a shop comes with expenses (restocking, rent, utilities), being a landlord means you can
      deduct costs like mortgage interest, property taxes, repairs, utilities, and depreciation (CCA, explained below).
      After deductions, your net rental income is taxed like any other income.
    </p>
    <Alert>
      <AlertTitle>Resource Tip</AlertTitle>
      <AlertDescription>
        Speaking of rent, check out YorkU's{" "}
        <Link href="https://www.yorku.ca/housing/" className="text-blue-600 hover:underline" target="_blank">
          housing services here <ExternalLink className="h-3 w-3 inline" />
        </Link>
      </AlertDescription>
    </Alert>

    <h3 className="font-bold text-xl">2. Capital Gains – The Flipped Candy Box</h3>
    <p>
      You buy a box of rare, limited-edition chocolates for $20 and later sell it for $50. That $30 profit? That's a
      capital gain—just like selling stocks or property for more than you paid. But here's the sweet part: only half of
      your capital gain is taxable, making it more tax-efficient than rental income.
    </p>
    <Alert>
      <AlertTitle>Resource Tip</AlertTitle>
      <AlertDescription>
        Now that we mentioned things that are sold at a lower-cost, I would highly recommend visiting Regenesis York, a
        community environmental organization dedicated to empowering students through free or low-cost services!
      </AlertDescription>
    </Alert>

    <h3 className="font-bold text-xl">3. Dividends – The Bonus Snack Packs</h3>
    <p>
      Imagine a snack company gives you free boxes of chips every few months just for owning part of their business.
      That's dividends—companies sharing profits with shareholders.
    </p>
    <ul className="list-disc pl-6 space-y-1">
      <li>
        Big companies (eligible dividends): They've already paid a lot of tax, so you get a tax credit and pay less.
      </li>
      <li>Smaller companies (non-eligible dividends): They've paid less tax, so you pay more.</li>
    </ul>
    <p>
      And just like you can't return free snack packs, you can't refuse dividends—once they're issued, they count as
      your income.
    </p>

    <h3 className="font-bold text-xl">4. Capital Cost Allowance (CCA) – The Expiring Snack Stock</h3>
    <p>
      Your shop stocks high-end snacks, but over time, they go stale. You wouldn't write off the full cost of expired
      inventory in one day—you spread it out. That's how CCA works: instead of deducting a big purchase (like a rental
      property) all at once, you claim a portion each year.
    </p>
    <p>
      The catch? CCA can't create a loss. If your rental income is $10,000 and expenses are $8,000, you have $2,000
      left. If your CCA is $3,000, you can only deduct $2,000—bringing taxable income to $0 but not negative. This
      prevents people from using CCA to erase taxes completely.
    </p>
  </div>
)

export const PaystubsSection = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">
      2. Understanding Pay Stubs and Tax Deductions: Why Can't I Buy All the Snacks?
    </h2>
    <p>
      You might think you've got a ton of money when you get paid, but your paycheck isn't all yours. Deductions come in
      and take a bite out of it, just like taxes on your snacks at checkout.
    </p>

    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6">
      <h3 className="font-bold text-lg mb-2">Sample Pay Stub</h3>
      <div className="border border-gray-300 dark:border-gray-600 rounded p-4 bg-white dark:bg-gray-900">
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold">York University Cafe</p>
            <p className="text-sm">123 Campus Drive</p>
            <p className="text-sm">Toronto, ON M3J 1P3</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Pay Period: Jan 1-15, 2025</p>
            <p className="text-sm">Pay Date: Jan 20, 2025</p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
          <p>
            <span className="font-bold">Employee:</span> Jane Student
          </p>
          <p>
            <span className="font-bold">Employee ID:</span> 12345
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div>
            <h4 className="font-bold mb-2">Earnings</h4>
            <div className="flex justify-between">
              <span>Regular Hours (40)</span>
              <span>$800.00</span>
            </div>
            <div className="flex justify-between">
              <span>Overtime Hours (5)</span>
              <span>$150.00</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Gross Pay</span>
              <span>$950.00</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Deductions</h4>
            <div className="flex justify-between">
              <span>Federal Income Tax</span>
              <span>$142.50</span>
            </div>
            <div className="flex justify-between">
              <span>CPP</span>
              <span>$47.50</span>
            </div>
            <div className="flex justify-between">
              <span>EI</span>
              <span>$15.20</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total Deductions</span>
              <span>$205.20</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
          <div className="flex justify-between font-bold">
            <span>Net Pay</span>
            <span>$744.80</span>
          </div>
        </div>
      </div>
    </div>

    <h3 className="font-bold text-xl">Gross Pay (aka "The Shelf Price")</h3>
    <p>
      This is the big, exciting number—your total earnings before anything's taken out. It's like seeing a bag of chips
      priced at $4.
    </p>

    <h3 className="font-bold text-xl">Deductions (aka "The Taxes and Hidden Fees")</h3>
    <p>These are the sneaky things that shrink your paycheck, like:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Income Tax: The government takes a cut to keep things running.</li>
      <li>CPP (Canada Pension Plan): You're saving for your future self (kind of like storing snacks for later).</li>
      <li>
        EI (Employment Insurance): Helps you out if you ever lose your job (think of it as emergency snack money).
      </li>
    </ul>

    <h3 className="font-bold text-xl">Net Pay (aka "What You Actually Have to Spend")</h3>
    <p>After all the deductions, this is the money you can actually use for snacks, rent, or savings.</p>
  </div>
)

export const T4SlipSection = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">3. Importance of the T4 Slip: Your Yearly Snack Tracker</h2>
    <p>At the end of the year, your employer gives you a T4 slip. It's like a receipt that sums up...</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>How much money you earned (gross income).</li>
      <li>How much was "deducted" for taxes, CPP, and EI.</li>
    </ul>
    <p>
      You'll need this slip to file your taxes—like showing the government your snack receipt at the door to make sure
      you didn't overpay (and maybe even get some of it back!).
    </p>

    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6">
      <h3 className="font-bold text-lg mb-2">Sample T4 Slip</h3>
      <div className="border border-gray-300 dark:border-gray-600 rounded p-4 bg-white dark:bg-gray-900">
        <div className="text-center mb-4">
          <h4 className="font-bold">T4 Statement of Remuneration Paid</h4>
          <p className="text-sm">Tax Year: 2024</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm">
              <span className="font-bold">Employer:</span> York University Cafe
            </p>
            <p className="text-sm">
              <span className="font-bold">Address:</span> 123 Campus Drive, Toronto, ON
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-bold">Employee:</span> Jane Student
            </p>
            <p className="text-sm">
              <span className="font-bold">SIN:</span> XXX-XXX-123
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 p-2">
            <p className="text-sm">
              <span className="font-bold">Box 14 - Employment Income:</span> $22,800.00
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 p-2">
            <p className="text-sm">
              <span className="font-bold">Box 22 - Income Tax Deducted:</span> $3,420.00
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 p-2">
            <p className="text-sm">
              <span className="font-bold">Box 16 - CPP Contributions:</span> $1,140.00
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 p-2">
            <p className="text-sm">
              <span className="font-bold">Box 18 - EI Premiums:</span> $364.80
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2 className="text-2xl font-bold">4. Gross vs. Net Income: The Shelf Price vs. Your Checkout Total</h2>
    <p>Here's how it works IRL:</p>

    <h3 className="font-bold text-xl">Gross Income (aka "What's on the Tag")</h3>
    <p>The sticker says a hoodie costs $60. That's your gross income—before taxes or discounts.</p>

    <h3 className="font-bold text-xl">Net Income (aka "What You Actually Pay")</h3>
    <p>
      By the time you add tax, the hoodie is $68. That's your net income—the actual amount in your hands after all the
      deductions. If we were to calculate this the other way around you might earn 68 dollars, but after tax deductions
      your income is only 60.
    </p>

    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg my-4">
      <h3 className="font-bold text-lg">Why It Matters:</h3>
      <p>
        If you're planning to save for something big (a trip, a gaming console, or, let's be real, more snacks), you
        need to budget based on your net income. Don't get caught thinking you have more money than you actually do!
      </p>
    </div>
  </div>
)

export const TaxationSection = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">5. Canada's Graduated Taxation System</h2>
    <p>
      Imagine you're at an all-you-can-eat buffet. You start with a small plate, paying one price, but as you go back
      for more, the restaurant charges a little extra for each new plate. That's kind of how Canada's tax system
      works—what you pay increases as you earn more money, but only on the extra portions, not the whole amount. Let's
      break it down buffet-style.
    </p>

    <h3 className="font-bold text-xl">1. What is a Graduated Tax System? (aka "The Buffet Rule")</h3>
    <p>
      Canada uses a progressive tax system, meaning the more you earn, the more tax you pay only on the extra portions
      of your income. Think of it like this:
    </p>
    <ul className="list-disc pl-6 space-y-1">
      <li>First plate (lowest income bracket): Cheapest price</li>
      <li>Second plate (next income bracket): Costs a little more</li>
      <li>Third plate (even higher income bracket): Costs even more</li>
      <li>And so on…</li>
    </ul>
    <p>
      Each person pays the same rate within each income bracket, so if you earn more, only the extra income is taxed at
      the higher rate.
    </p>

    <h3 className="font-bold text-xl">2. How Much Do You Pay? (aka "Stacking Your Plates")</h3>
    <p>
      The government divides taxable income into brackets, each with its own tax rate. Here are the 2024 federal tax
      brackets:
    </p>

    <div className="overflow-x-auto my-4">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">
              Taxable Income Bracket
            </th>
            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Federal Tax Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Up to $55,867</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">15%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">$55,867 to $111,733</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">20.5%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">$111,733 to $173,205</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">26%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">$173,205 to $246,752</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">29%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Over $246,752</td>
            <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">33%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-4">
      <h3 className="font-bold text-lg">Example:</h3>
      <p>Let's say you make $80,000 a year. You don't pay 20.5% on all of it! Instead:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>The first $55,867 is taxed at 15%.</li>
        <li>The next $24,133 ($80,000 - $55,867) is taxed at 20.5%.</li>
      </ul>
      <p>Your total tax is a mix of these, not just the highest rate.</p>
    </div>

    <h3 className="font-bold text-xl">3. What About Provincial Taxes? (aka "Different Buffets, Different Prices")</h3>
    <p>
      On top of federal taxes, each province and territory has its own tax rates. So, if you live in Ontario, Alberta,
      or Quebec, your total tax amount will be different even if you earn the same as someone in another province.
    </p>

    <h3 className="font-bold text-xl">4. Why is the System Set Up Like This? (aka "Fair Share at the Buffet")</h3>
    <p>
      The graduated tax system is designed to be fair. If everyone paid the same tax rate, lower-income earners would
      struggle, while higher-income earners would keep more. By taxing higher incomes at higher rates, Canada aims to
      reduce income inequality and fund essential services like healthcare, education, and public programs.
    </p>

    <h3 className="font-bold text-xl">5. Free Tax Filing Options (aka "Your DIY Tax Toolkit")</h3>
    <p>Filing taxes doesn't have to cost a fortune! Here are some free tools to help:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>
        <Link href="https://www.wealthsimple.com/en-ca/tax" className="text-blue-600 hover:underline" target="_blank">
          Wealthsimple Tax <ExternalLink className="h-3 w-3 inline" />
        </Link>{" "}
        (formerly SimpleTax) – A free online tax filing software certified by the CRA.
      </li>
      <li>
        <Link
          href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program.html"
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          Canada Revenue Agency (CRA) Free Tax Clinics <ExternalLink className="h-3 w-3 inline" />
        </Link>{" "}
        – Get in-person help from trained volunteers.
      </li>
    </ul>

    <h3 className="font-bold text-xl">6. First-Time CRA Account Access (aka "Unlocking Your Tax Portal")</h3>
    <p>If you've never filed taxes before, you'll need to access your CRA account:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>
        Log in using a Sign-In Partner (like your online banking credentials).
        <Link
          href="https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/account-individuals.html"
          className="text-blue-600 hover:underline ml-1"
          target="_blank"
        >
          More info here <ExternalLink className="h-3 w-3 inline" />
        </Link>
      </li>
      <li>Request a CRA security code to set up direct access for future tax filings.</li>
    </ul>

    <h3 className="font-bold text-xl">7. Setting Up CRA Direct Deposit (aka "Getting Paid Faster")</h3>
    <p>To receive tax refunds or benefits quickly, set up CRA Direct Deposit:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>
        Log into CRA My Account.
        <Link
          href="https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/account-individuals.html"
          className="text-blue-600 hover:underline ml-1"
          target="_blank"
        >
          Login here <ExternalLink className="h-3 w-3 inline" />
        </Link>
      </li>
      <li>Select Direct Deposit and enter your banking details.</li>
      <li>Alternatively, set it up through your bank's online platform (look for "CRA Direct Deposit").</li>
    </ul>

    <h3 className="font-bold text-xl">8. RBC Relevant Resources:</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li>
        RBC facilitates the CRA My Payment service through RBC Virtual Visa Debit, enabling quick and secure payments to
        the CRA.
        <Link
          href="https://www.rbcroyalbank.com/ways-to-bank/online-banking/index.html"
          className="text-blue-600 hover:underline ml-1"
          target="_blank"
        >
          For more information click here <ExternalLink className="h-3 w-3 inline" />
        </Link>
      </li>
      <li>
        RBC provides online tax filing options for both individuals and businesses, allowing you to file taxes directly
        through RBC's platforms.
        <Link
          href="https://www.rbcroyalbank.com/ways-to-bank/online-banking/index.html"
          className="text-blue-600 hover:underline ml-1"
          target="_blank"
        >
          You can find this tool here <ExternalLink className="h-3 w-3 inline" />
        </Link>
      </li>
      <li>
        RBC advisors in RBConCampus can always support you in understanding your income. Give them a visit at 95 The
        Pond Rd UNIT 35, North York, ON M3J 2S5
      </li>
    </ul>
  </div>
)

export const TiktokSection = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">TikTok Summary Content</h2>
    <p>Progressively getting worse tik tok trend - the incredibles meme Based on the tax percentage:</p>

    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
      <h3 className="font-bold text-lg mb-2 text-center">Tax Brackets Be Like...</h3>
      <div className="space-y-4">
        <div className="flex items-center p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
            15%
          </div>
          <div>
            <p className="font-bold">Up to $55,867</p>
            <p className="text-sm">*Mr. Incredible smiling*</p>
          </div>
        </div>

        <div className="flex items-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
            20.5%
          </div>
          <div>
            <p className="font-bold">$55,867 to $111,733</p>
            <p className="text-sm">*Mr. Incredible slightly concerned*</p>
          </div>
        </div>

        <div className="flex items-center p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
            26%
          </div>
          <div>
            <p className="font-bold">$111,733 to $173,205</p>
            <p className="text-sm">*Mr. Incredible worried*</p>
          </div>
        </div>

        <div className="flex items-center p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
            29%
          </div>
          <div>
            <p className="font-bold">$173,205 to $246,752</p>
            <p className="text-sm">*Mr. Incredible distressed*</p>
          </div>
        </div>

        <div className="flex items-center p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
            33%
          </div>
          <div>
            <p className="font-bold">Over $246,752</p>
            <p className="text-sm">*Mr. Incredible uncanny*</p>
          </div>
        </div>
      </div>
    </div>

    <p className="text-center italic">
      Remember: You only pay the higher rate on the portion of income that falls into each bracket!
    </p>
  </div>
)

