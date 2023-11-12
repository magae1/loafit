import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import _ from "underscore";
import dayjs from "dayjs";

type SearchMapType = {
  [name: string]: number;
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/character")) {
    const pathString = decodeURI(request.nextUrl.pathname);
    const charName = pathString.slice(11, pathString.length);

    let cookieValue = request.cookies.get("recent-search-characters")?.value;

    let characterList: SearchMapType = {};
    if (cookieValue) {
      characterList = JSON.parse(cookieValue) as SearchMapType;
    }
    characterList[charName] = new Date().getTime();

    characterList = _.chain(characterList)
      .pairs()
      .filter((v) => {
        const [a, b] = v;
        let today = new Date();
        let targetDay = new Date();
        targetDay.setDate(today.getDate() - 7);
        return b >= targetDay.getTime();
      })
      .object()
      .value();

    const response = NextResponse.next();
    response.cookies.set({
      name: "recent-search-characters",
      value: JSON.stringify(characterList),
      path: "/",
      httpOnly: true,
      expires: dayjs().add(1, "month").toDate(),
    });
    return response;
  }
}
