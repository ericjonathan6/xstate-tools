import { types as t } from "@babel/core";
import { MaybeArrayOfActions } from "./actions";
import { Cond } from "./conds";
import { createParser } from "./createParser";
import { StringLiteral, TemplateLiteral } from "./scalars";
import { StringLiteralNode } from "./types";
import { unionType } from "./unionType";
import {
  GetParserResult,
  maybeArrayOf,
  objectTypeWithKnownKeys,
} from "./utils";
import { wrapParserResult } from "./wrapParserResult";

export type TransitionConfigNode = GetParserResult<typeof TransitionObject>;

const TransitionTarget = maybeArrayOf(
  unionType([StringLiteral, TemplateLiteral]),
);

const TransitionObject = objectTypeWithKnownKeys({
  target: TransitionTarget,
  actions: MaybeArrayOfActions,
  cond: Cond,
});

const TransitionConfigOrTargetLiteral = unionType([
  TransitionObject,
  wrapParserResult(TransitionTarget, (targets): TransitionConfigNode => {
    return {
      target: targets,
      node: targets[0].node,
    };
  }),
]);

export const MaybeTransitionArray = maybeArrayOf(
  TransitionConfigOrTargetLiteral,
);
