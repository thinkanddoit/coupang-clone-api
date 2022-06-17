import type { NextApiRequest, NextApiResponse } from "next";

import { cors, createJwt } from "@/lib";
import { UserRepository } from "@/repositories";

export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isExisting = await UserRepository.check({ email: req.body.email });
  if (isExisting) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  await UserRepository.create(req.body);
  const user = await UserRepository.get({ email: req.body.email });

  res.status(200).json(createJwt(user.email));
});
