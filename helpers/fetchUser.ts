import { array, number, object, string, type Output, transform } from "valibot";

export const TOKEN = process.env.GITHUB_TOKEN;

// export type Week = {
//   contributionDays: ContributionDay[];
// };

// type ContributionDay = {
//   color: string;
//   contributionCount: number;
//   date: string;
// };

// export type ApiResponse = {
//   data: {
//     user: {
//       avatarUrl: string;
//       contributionsCollection: {
//         contributionCalendar: {
//           totalContributions: number;
//           weeks: Week[];
//         };
//       };
//     };
//   };
// };

const ContributionDaySchema = object({
  color: string(),
  contributionCount: number(),
  date: string(),
});

const WeekSchema = object({
  contributionDays: array(ContributionDaySchema),
});

export type Week = Output<typeof WeekSchema>;

export const ApiResponseSchema = transform(
  object({
    data: object({
      user: object({
        avatarUrl: string(),
        bio: string(),
        contributionsCollection: object({
          contributionCalendar: object({
            totalContributions: number(),
            weeks: array(WeekSchema),
          }),
        }),
      }),
    }),
  }),
  (input) => {
    const {
      avatarUrl,
      bio,
      contributionsCollection: {
        contributionCalendar: { weeks, totalContributions },
      },
    } = input.data.user;

    return {
      avatarUrl,
      bio,
      weeks,
      totalContributions,
    };
  }
);

export const query = `
query($userName:String!) {
  user(login: $userName){
    avatarUrl
    bio
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;
