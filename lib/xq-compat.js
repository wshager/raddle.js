/* xquery version "3.1" */

/*module namespace xqc="http://raddle.org/xquery-compat";

nil_0()*/

import * as n from "n.js"

import * as fn from "fn.js"

import * as map from "map.js"

export const ncname = "\p{L}\p{N}\-_\."

export const qname = n.concat_2(n.concat_2(n.concat_2(n.concat_2(n.concat_2("[", ncname), "]*:?"), "["), ncname), "]+")

export const operatorRegexp = "=#\p{N}+#?\p{N}*="

export const operators = n.map(n.Sequence(1, ",", 2.01, "some", 2.02, "every", 2.03, "switch", 2.04, "typeswitch", 2.05, "try", 2.06, "if", 2.07, "then", 2.08, "else", 2.09, "let", 2.1, ":=", 2.11, "return", 2.12, "case", 2.13, "default", 2.14, "xquery", 2.15, "version", 2.16, "module", 2.17, "declare", 2.18, "variable", 2.19, "import", 3, "or", 4, "and", 5.01, "eq", 5.02, "ne", 5.03, "lt", 5.04, "le", 5.05, "gt", 5.06, "ge", 5.07, "=", 5.08, "!=", 5.09, "<=", 5.1, ">=", 5.11, "<<", 5.12, ">>", 5.13, "<", 5.14, ">", 5.15, "is", 6, "||", 7, "to", 8.01, "+", 8.02, "-", 9.01, "*", 9.02, "idiv", 9.03, "div", 9.04, "mod", 10.01, "union", 10.02, "|", 11.01, "intersect", 11.02, "except", 12, "instance of", 13, "treat as", 14, "castable as", 15, "cast as", 16, "=>", 17.01, "+", 17.02, "-", 18, "!", 19.01, "/", 19.02, "//", 19.03, "/*", 20.01, "[", 20.02, "]", 20.03, "?", 20.04, "[", 20.05, "[", 20.06, "{", 20.07, "}", 20.08, "@", 21.01, "array", 21.02, "attribute", 21.03, "comment", 21.04, "document", 21.05, "element", 21.06, "function", 21.07, "map", 21.08, "namespace", 21.09, "processing-instruction", 21.1, "text", 22.01, "array", 22.02, "attribute", 22.03, "comment", 22.04, "document-node", 22.05, "element", 22.06, "empty-sequence", 22.07, "function", 22.08, "item", 22.09, "map", 22.1, "namespace-node", 22.11, "node", 22.12, "processing-instruction", 22.13, "schema-attribute", 22.14, "schema-element", 22.15, "text", 24, "as", 25.01, "(:", 25.02, ":)", 26, ":"))

export const operatorsI = fn.foldLeft_3(map.keys_1(operators), n.map(n.Sequence()), function($pre, $cur) /*new n.Item()*/ {

    return map.put_3($pre, operators($cur), $cur);

})

export const types = "untypedAtomic"

export const operatorMap = n.map(n.Sequence(2.09, "item", 5.01, "eq", 5.02, "ne", 5.03, "lt", 5.04, "le", 5.05, "gt", 5.06, "ge", 5.07, "geq", 5.08, "gne", 5.09, "gle", 5.1, "gge", 5.11, "precedes", 5.12, "follows", 5.13, "glt", 5.14, "ggt", 6, "concat", 8.01, "add", 8.02, "subtract", 9.01, "multiply", 10.02, "union", 17.01, "plus", 17.02, "minus", 18, "for-each", 19.01, "select", 19.02, "select-all", 20.01, "filter", 20.03, "lookup", 20.04, "array", 20.05, "filter-at", 20.08, "select-attribute"))

export function normalizeQuery_2($query, $params) /*new n.Item()*/ {

    var $cur, $next;

    return (($query = new n.Item(fn.replace_3(fn.replace_3(fn.replace_3(fn.replace_3($query, "%3E", ">"), "%3C", "<"), "%2C", ","), "%3A", ":")),

        $query = new n.Item(fn.foldLeft_3(n.filter_2(map.keys_1(operators), ((($_0 != 5.07) && ($_0 != 1)))), $query, function($cur, $next) /*new n.Item()*/ {

            return fn.replace_3($cur, escapeForRegex_1($next), ((fn.round_1($next) == 22) ? fn.concat_3("$1", toOp_1($next), "$2") : fn.concat_3("$1 ", opStr_1($next), " $2")));

        })),

        $query = new n.Item(fn.foldLeft_3(types, $query, function($cur, $next) /*new n.Item()*/ {

            return (($cur = new n.Item(fn.replace_3($cur, fn.concat_3("xs:", $next, "\s*([^\(])"), fn.concat_3("core:", $next, "()$1"))), fn.replace_3($cur, fn.concat_3("xs:", $next, "\s*\("), fn.concat_3("core:", $next, "("))));

        })),

        $query = new n.Item(fn.replace_3($query, ",", "=#1=")),

        $query = new n.Item(fn.replace_3($query, "=(#\p{N}+#?\p{N}*)=", "%3D$1%3D")),

        $query = new n.Item(fn.replace_3($query, "=", "=#5#07=")),

        $query = new n.Item(fn.replace_3($query, "%3D", "=")),

        $query = new n.Item(fn.replace_3($query, n.concat_2(n.concat_2("(", operatorRegexp), ")"), " $1 ")),

        $query = new n.Item(fn.replace_3($query, "\s+", " ")),

        $query = new n.Item(fn.replace_3($query, "=#19#01=\s*=#20#08=", "=#20#08=")),

        $query = new n.Item(block_2(n.filter_2(n.select(fn.analyzeString_2($query, "(?:^?)([^\s\(\),\.;]+)(?:$?)"), "*"), n.Sequence(n.geq_2((n.geq_2(fn.name_0(), "fn:match") || fn.matches_2(fn.string_0(), "^\s*$")), fn.false_0()))), "")),

        $query = new n.Item(fn.replace_3($query, "\s+", "")),

        $query));

}

export function normalizeFilter_1($query) /*new n.Item()*/ {

    return (fn.matches_2($query, "^([\+\-]?\p{N}+)|position$") ? n.concat_2(".=#5#07=", $query) : $query);

}

export function seqtype_3($parts, $ret, $lastseen) /*new n.Item()*/ {

    var $head, $maybeSeqtype;

    return (($head = new n.Item(n.select(n.filter_2(n.select(fn.head_1($parts), "fn:group"), (n.geq_2(n.selectAttribute($_0, "nr"), 1))), fn.string_0())),

        $maybeSeqtype = new n.Item((fn.matches_2($head, operatorRegexp) ? opNum_1($head) : 0)),

        (($maybeSeqtype == 20.06) ? body_3($parts, fn.concat_2($ret, ","), ($lastseen, 21.06)) : seqtype_3(fn.tail_1($parts), $ret, $lastseen))));

}

export function as_3($param, $parts, $ret) /*new n.Item()*/ {

    return as_4($param, $parts, $ret, "nil_0()");

}

export function as_4($param, $parts, $ret, $lastseen) /*new n.Item()*/ {

    return as_6($param, $parts, $ret, $lastseen, fn.false_0(), fn.false_0());

}

export function as_6($param, $parts, $ret, $lastseen, $subtype, $seqtype) /*new n.Item()*/ {

    var $head, $next, $no, $non;

    return (($head = new n.Item(n.select(fn.head_1($parts), fn.string_0())),

        $next = new n.Item(n.select(n.filterAt_2($parts, (n.geq_2($_0, 2))), fn.string_0())),

        $no = new n.Item((fn.matches_2($head, operatorRegexp) ? opNum_1($head) : 0)),

        $non = new n.Item((fn.matches_2($next, operatorRegexp) ? opNum_1($next) : 0)),

        (($no == 24) ? as_6($param, fn.tail_1($parts), fn.concat_3($ret, ($subtype ? "" : ""), ","), $lastseen, $subtype, fn.true_0()) :
            (($no == 1) ? ($subtype ? as_6($param, fn.tail_1($parts), fn.concat_2($ret, ","), $lastseen, $subtype, $seqtype) :
                params_2(fn.tail_1($parts), fn.concat_2($ret, ","))
                ) : (
                    fn.matches_2($head, fn.concat_3("core:[", ncname, "]+")) ? (
                        fn.matches_2($next, "^\s*\(\s*$") ?
                        as_6(n.sequence(), fn.subsequence_2($parts, 3), fn.concat_6($ret, $head, "(", $param, ",", (($head == "core:function") ? "(" : "")), $lastseen, fn.true_0(), $seqtype) :
                        as_6(n.sequence(), fn.tail_1($parts), fn.concat_5($ret, $head, "(", $param, (($head == "core:function") ? ",(" : "")), $lastseen, $subtype, $seqtype)) : (
                            fn.matches_2($head, "[\?\+\*]") ? as_6($param, fn.tail_1($parts), fn.concat_2($ret, $head), $lastseen, $subtype, $seqtype) : (
                                fn.matches_2($head, "^(\(\))?\s*\)") ? (n.geq_2(($subtype && $non), n.Sequence(1, 24)) ?
                                as_6($param, fn.tail_1($parts), fn.concat_2($ret, (($non == 24) ? "" : ")")), $lastseen, fn.false_0(), $seqtype) : (
                                    ($non == 24) ? seqtype_3(fn.tail_1($parts), fn.concat_3($ret, ($subtype ? ")" : ""), "),"), $lastseen) : (
                                        ($non == 20.06) ? body_3(fn.tail_1($parts), fn.concat_4($ret, ($subtype ? ")" : ""), (fn.matches_2($head, "^\(\)") ? ")" :
                                        ""), "),core:item(),"), ($lastseen, 21.06)) :
                        console.log_1($parts)))) : as_6($param, fn.tail_1($parts), fn.concat_3($ret, ((($non == 1) && $seqtype) ? ")" : ""), ")"), $lastseen, $subtype, $seqtype)))))))
                    );

}

export function params_2($parts, $ret) /*new n.Item()*/ {

    return params_3($parts, $ret, "nil_0()");

}

export function params_3($parts, $ret, $lastseen) /*new n.Item()*/ {

    var $maybeParam, $next;

    return (($maybeParam = new n.Item(n.select(fn.head_1($parts), fn.string_0())),

        $next = new n.Item(n.select(n.filterAt_2($parts, (n.geq_2($_0, 2))), fn.string_0())),

        (fn.matches_2($maybeParam, "^(\(\))?\s*\)") ? (($next == "=#24=") ? seqtype_3(fn.tail_1($parts), n.concat_2($ret, "),"), $lastseen) : body_3(fn.tail_1($parts), fn.concat_2($ret, "),core:item(),"), ($lastseen, 21.06))) : (fn.matches_2($maybeParam, "=#1=") ? params_3(fn.tail_1($parts), fn.concat_2($ret, ","), $lastseen) : (fn.matches_2($maybeParam, "^\$") ? (n.geq_2($next, "=#24=") ? as_4(fn.replace_3($maybeParam, "^\$", "\$,"), fn.subsequence_2($parts, 3), $ret, $lastseen) : params_3(fn.tail_1($parts), fn.concat_4($ret, "core:item(", fn.replace_3($maybeParam, "^\$", "\$,"), ")"), $lastseen)) : params_3(fn.tail_1($parts), $ret, $lastseen))))));

}

export function fn_2($parts, $ret) /*new n.Item()*/ {

    return params_2(fn.tail_1($parts), n.concat_2(n.select(n.filter_2(n.concat_2($ret, n.select(fn.head_1($parts), "fn:group")), (n.geq_2(n.selectAttribute($_0, "nr"), 1))), fn.string_0()), ",(),("));

}

export function ns_2($parts, $ret) /*new n.Item()*/ {

    var $ns, $rest;

    return (($ns = new n.Item(fn.replace_3(n.select(fn.head_1($parts), fn.string_0()), "\s", "")),

        $rest = new n.Item(fn.tail_1($parts)),

        fn.stringJoin_1($rest)));

}

export function var_2($parts, $ret) /*new n.Item()*/ {

    return body_3(fn.subsequence_2($parts, 3), fn.concat_3($ret, n.select(n.filterAt_2($parts, (n.geq_2($_0, 1))), fn.string_0()), ",(),"), (2.18));

}

export function annot_2($parts, $ret) /*new n.Item()*/ {

    return annot_3($parts, $ret, "");

}

export function annot_3($parts, $ret, $annot) /*new n.Item()*/ {

    var $maybeAnnot, $rest;

    return (($maybeAnnot = new n.Item(n.select(n.filter_2(n.select(fn.head_1($parts), "fn:group"), (n.geq_2(n.selectAttribute($_0, "nr"), 1))), fn.string_0())),

        $rest = new n.Item(fn.tail_1($parts)),

        (fn.matches_2($maybeAnnot, "^%") ? annot_3($rest, $ret, fn.replace_3($maybeAnnot, "^%", "-")) : (n.geq_2($maybeAnnot, "=#21#06=") ? fn_2($rest, n.concat_2(n.concat_2(n.concat_2($ret, "core:define"), $annot), "($,")) : (n.geq_2($maybeAnnot, "=#2#18=") ? var_2($rest, n.concat_2(n.concat_2(n.concat_2($ret, "core:var"), $annot), "($,")) : $ret)))));

}

export function xquery_2($parts, $ret) /*new n.Item()*/ {

    return block_2(fn.subsequence_2($parts, 3), fn.concat_4($ret, "core:xq-version($,", n.select(n.filterAt_2($parts, (n.geq_2($_0, 2))), fn.string_0()), ")"));

}

export function module_2($parts, $ret) /*new n.Item()*/ {

    return block_2(fn.subsequence_2($parts, 5), fn.concat_6($ret, "core:module($,", n.select(n.filterAt_2($parts, (n.geq_2($_0, 2))), fn.string_0()), ",", n.select(n.filterAt_2($parts, (n.geq_2($_0, 4))), fn.string_0()), ",())"));

}

export function repl_2($lastseen, $no) /*new n.Item()*/ {

    var $last;

    return (($last = new n.Item(n.filter_2(fn.indexOf_2($lastseen, ($no - new n.Decimal(0.01))), n.Sequence(fn.last_0()))),

        fn.remove_2($lastseen, $last)));

}

export function close_2($lastseen, $no) /*new n.Item()*/ {

    return close_3(fn.reverse_1($lastseen), $no, "nil_0()");

}

export function close_3($lastseen, $no, $ret) /*new n.Item()*/ {

    return ((fn.empty_1($lastseen) || ($no == 0)) ? fn.reverse_1(($ret, $lastseen)) : ((fn.head_1($lastseen) != 0.01) ? close_3(fn.tail_1($lastseen), $no, (fn.head_1($lastseen), $ret)) : close_3(fn.tail_1($lastseen), ($no - 1), $ret)));

}

export function closer_1($b) /*new n.Item()*/ {

    return closer_2(fn.reverse_1($b), 0);

}

export function closer_2($b, $c) /*new n.Item()*/ {

    return (n.geq_2((fn.exists_1($b) && fn.head_1($b)), n.Sequence(2.08, 2.11)) ? closer_2(fn.tail_1($b), ($c + 1)) : $c);

}

export function lastIndexOf_2($lastseen, $a) /*new n.Item()*/ {

    var $id;

    return (($id = new n.Item(fn.indexOf_2($lastseen, $a)),

        (fn.empty_1($id) ? 1 : n.filter_2($id, n.Sequence(fn.last_0())))));

}

export function pop_1($a) /*new n.Item()*/ {

    return fn.reverse_1(fn.tail_1(fn.reverse_1($a)));

}

export function anon_4($head, $parts, $ret, $lastseen) /*new n.Item()*/ {

    return params_3($parts, n.concat_2($ret, "core:function(("), $lastseen);

}

export function map_3($parts, $ret, $lastseen) /*new n.Item()*/ {

    var $head, $op;

    return (($head = new n.Item(n.select(fn.head_1($parts), fn.string_0())),

        $op = new n.Item((fn.matches_2($head, operatorRegexp) ? opNum_1($head) : 0)),

        body_3($parts, $ret, $lastseen)));

}

export function comment_3($parts, $ret, $lastseen) /*new n.Item()*/ {

    var $head, $rest;

    return (($head = new n.Item(n.select(fn.head_1($parts), fn.string_0())),

        $rest = new n.Item(fn.tail_1($parts)),

        (n.geq_2($head, "=#25#02=") ? body_3($rest, $ret, $lastseen) : comment_3($rest, $ret, $lastseen))));

}

export function bodyOp_5($no, $next, $lastseen, $rest, $ret) /*new n.Item()*/ {

    var $old, $closer, $qn, $positional, $hascomma, $letopener, $elsecloser, $retncloser, $letclose, $letcloser, $n, $lastindex, $closes, $nu;

    return (($no == 1) ? ($old = new n.Item($lastseen), $closer = new n.Item(closer_1($lastseen)), $ret = new n.Item(fn.concat_3($ret, fn.stringJoin_1(n.forEach_2(n.Sequence(n.to(1, $closer)), ")")), ",")), $lastseen = new n.Item(fn.subsequence_3($lastseen, 1, (fn.count_1($lastseen) - $closer))), body_3($rest, $ret, $lastseen)) : (($no == 25.01) ? comment_3($rest, $ret, $lastseen) : (($no == 21.06) ? anon_4($next, fn.tail_1($rest), $ret, $lastseen) : ((fn.round_1($no) == 21) ? ($ret = new n.Item(fn.concat_3($ret, opStr_1($no), "(")), $qn = new n.Item((($next != "=#20#06=") ? $next : nil_0())), $rest = new n.Item((fn.exists_1($qn) ? fn.tail_1($rest) : $rest)), $ret = new n.Item((fn.exists_1($qn) ? fn.concat_3($ret, $next, ",") : $ret)), body_3($rest, $ret, ($lastseen, $no))) : ($old = new n.Item($lastseen), $positional = new n.Item(((($no == 20.01) && $next) && fn.matches_2($next, "^([\+\-]?(\p{N}+|\$))|position$"))), $hascomma = new n.Item((fn.substring_2($ret, fn.stringLength_1($ret)) == ",")), $letopener = new n.Item((($no == 2.09) && n.Sequence((fn.not_1((n.geq_2(n.filter_2($lastseen, n.Sequence(fn.last_0())), n.Sequence(2.09, 2.1)) || n.Sequence(n.geq_2(((n.filter_2($lastseen, n.Sequence(fn.last_0())) == 2.08) && $hascomma), fn.false_0())))) || n.Sequence((n.filter_2($lastseen, n.Sequence(fn.last_0())) == 20.06)))))), $elsecloser = new n.Item((($no == 2.08) ? lastIndexOf_2($lastseen, 2.07) : 0)), $retncloser = new n.Item((($no == 2.11) ? lastIndexOf_2($lastseen, 2.1) : 0)), $letclose = new n.Item(n.geq_2(((($no == 2.09) && fn.not_1(((n.filter_2($lastseen, n.Sequence(fn.last_0())) == 20.06) || fn.empty_1($lastseen)))) && $hascomma), fn.false_0())), $letcloser = new n.Item((n.geq_2(n.filter_2(($letclose && $lastseen), n.Sequence(fn.last_0())), n.Sequence(2.08, 2.11)) ? closer_1($lastseen) : 0)), $ret = new n.Item(fn.concat_2($ret, (n.geq_2($no, n.Sequence(2.06, 2.09, 20.01, 20.04)) ? fn.concat_6(($letclose ? ($n = new n.Item(console.log_1(($letcloser, "||", n.filter_2($lastseen, n.Sequence((fn.last_0() - $letcloser)))))), fn.concat_3(fn.stringJoin_1(n.forEach_2(n.Sequence(n.to(1, $letcloser)), ")")), ((n.filter_2($lastseen, n.Sequence((fn.last_0() - $letcloser))) == 2.1) ? ")" : ""), ($hascomma ? "" : ","))) : ""), ($letopener ? "(" : ""), ($positional ? opStr_1(20.05) : opStr_1($no)), (($no == 20.04) ? "(" : ""), (($no == 2.06) ? "" : "("), (($no == 2.09) ? fn.concat_2("$,", fn.replace_3($next, "^\$|\s", "")) : (($no == 20.01) ? fn.concat_2((fn.matches_2($next, "#20#08") ? "." : ($positional ? (fn.matches_2($next, "position") ? "." : ".=#5#07=") : "")), $next) : ""))) : ((($no == 26) || n.Sequence((n.filter_2((($no == 2.1) && $lastseen), n.Sequence((fn.last_0() - 1))) == 21.07))) ? "," : (($no == 20.07) ? ($lastindex = new n.Item(lastIndexOf_2($lastseen, 20.06)), $closes = new n.Item(n.filter_2(fn.subsequence_3($lastseen, $lastindex, fn.count_1($lastseen)), (n.geq_2($_0, n.Sequence(2.08, 2.11))))), $closes = new n.Item(n.Sequence($closes, 2.11)), fn.concat_2(fn.stringJoin_1(n.forEach_2($closes, ")")), (($next == "=#20#06=") ? "," : ((fn.round_1(n.filterAt_2($lastseen, (n.geq_2($_0, ($lastindex - 1))))) == 21) ? ")" : "")))) : (n.geq_2($no, n.Sequence(2.07, 2.1)) ? fn.concat_2(((n.filter_2($lastseen, n.Sequence(fn.last_0())) == 2.11) ? ")" : ""), ",") : (($no == 2.08) ? fn.concat_2(fn.stringJoin_1(n.forEach_2(fn.subsequence_2($lastseen, ($elsecloser + 1)), ")")), ",") : (($no == 2.11) ? fn.concat_2(fn.stringJoin_1(n.forEach_2(fn.subsequence_2($lastseen, ($retncloser + 1)), ")")), "),") : (($no == 20.02) ? ((n.filter_2($lastseen, n.Sequence(fn.last_0())) == 20.04) ? "))" : ")") : (($no == 20.06) ? "(" : opStr_1($no))))))))))), $rest = new n.Item(((fn.empty_1($rest) || fn.not_1(n.geq_2($no, n.Sequence(2.09, 20.01)))) ? $rest : fn.tail_1($rest))), $lastseen = new n.Item((n.geq_2($no, n.Sequence(2.06, 2.09, 20.01, 20.04)) ? ($lastseen = new n.Item(($letclose ? fn.subsequence_3($lastseen, 1, (fn.count_1($lastseen) - $letcloser)) : $lastseen)), $lastseen = new n.Item(((n.filter_2(($letclose && $lastseen), n.Sequence(fn.last_0())) == 2.1) ? pop_1($lastseen) : $lastseen)), ($lastseen, $no)) : ((($no == 26) || n.Sequence((n.filter_2((($no == 2.1) && $lastseen), n.Sequence((fn.last_0() - 1))) == 21.07))) ? $lastseen : (n.geq_2($no, 20.07) ? ($lastseen = new n.Item(fn.subsequence_3($lastseen, 1, (lastIndexOf_2($lastseen, 20.06) - 1))), (((fn.round_1(n.filter_2($lastseen, n.Sequence(fn.last_0()))) == 21) && ($next != "=#20#06=")) ? pop_1($lastseen) : $lastseen)) : (n.geq_2($no, n.Sequence(2.07, 2.1)) ? ($lastseen = new n.Item((((n.filter_2($lastseen, n.Sequence(fn.last_0())) == 2.11) || n.Sequence((n.filter_2((($no == 2.07) && $lastseen), n.Sequence(fn.last_0())) == 0.01))) ? pop_1($lastseen) : $lastseen)), repl_2($lastseen, $no)) : (($no == 2.08) ? ($lastseen = new n.Item(fn.subsequence_3($lastseen, 1, ($elsecloser - 1))), ($lastseen, $no)) : (($no == 2.11) ? ($lastseen = new n.Item(fn.subsequence_3($lastseen, 1, ($retncloser - 1))), ($lastseen, $no)) : ((($no == 20.06) || (fn.round_1($no) == 21)) ? n.Sequence($lastseen, $no) : (($no == 20.02) ? pop_1($lastseen) : $lastseen))))))))), $nu = new n.Item(console.log_1(($no, " :: ", fn.stringJoin_2($old, ","), "->", fn.stringJoin_2($lastseen, ","), " || ", fn.replace_3(fn.replace_3($ret, "=#2#06=", "if"), "=#2#09=", "let")))), body_3($rest, $ret, $lastseen))))));

}

export function isArray_3($head, $non, $next) /*new n.Item()*/ {

    return (n.geq_2((($non == 20.01) && fn.matches_2($head, "\)\s*$")), fn.false_0()) && fn.matches_2($head, n.concat_2(n.concat_2("^(\s|\(|,|", operatorRegexp), ")")));

}

export function diff_2($a, $b) /*new n.Item()*/ {

    var $x, $y;

    return (($x = new n.Item(n.filter_2($b, (fn.not_1(n.geq_2($_0, $a))))),

        $y = new n.Item(n.filter_2($a, (fn.not_1(n.geq_2($_0, $b))))),

        fn.concat_5("+", fn.stringJoin_2($x, ","), ",", "-", fn.stringJoin_2($y, ","))));

}

export function parenCloser_2($head, $lastseen) /*new n.Item()*/ {

    var $cp, $old, $d, $n;

    return (fn.matches_2($head, "[\(\)]+") ? ($cp = new n.Item(fn.stringToCodepoints_1($head)), $old = new n.Item($lastseen), $lastseen = new n.Item(n.Sequence($lastseen, n.forEach_2(n.filter_2($cp, (($_0 == 40))), 0.01))), $lastseen = new n.Item(close_2($lastseen, fn.count_1(n.filter_2($cp, (($_0 == 41)))))), $d = new n.Item(diff_2($old, $lastseen)), $n = new n.Item((($d != "+,-") ? console.log_1((") :: ", $d)) : "")), $lastseen) : $lastseen);

}

export function body_2($parts, $ret) /*new n.Item()*/ {

    return body_3($parts, $ret, "nil_0()");

}

export function body_3($parts, $ret, $lastseen) /*new n.Item()*/ {

    var $head, $rest, $next, $non;

    return (fn.empty_1($parts) ? fn.concat_2($ret, fn.stringJoin_1(n.forEach_2(n.filter_2($lastseen, (n.geq_2($_0, n.Sequence(2.08, 2.11, 20.07)))), ")"))) : ($head = new n.Item(n.select(fn.head_1($parts), fn.string_0())), $rest = new n.Item(fn.tail_1($parts)), $lastseen = new n.Item(parenCloser_2($head, $lastseen)), (n.geq_2($head, "=#25#01=") ? comment_3($rest, $ret, $lastseen) : (fn.matches_2($head, ";") ? block_2($parts, ((n.filter_2($lastseen, n.Sequence(fn.last_0())) == 2.18) ? fn.concat_3($ret, fn.replace_3($head, ";", ""), ")") : $ret)) : ($next = new n.Item((fn.empty_1($rest) ? nil_0() : n.select(fn.head_1($rest), fn.string_0()))), $non = new n.Item((fn.matches_2($next, operatorRegexp) ? opNum_1($next) : 0)), $rest = new n.Item((isArray_3($head, $non, $next) ? fn.insertBefore_3(fn.tail_1($rest), 1, n.element(n.Sequence(
        n.element(n.Sequence(n.attribute(n.Sequence(1)), opStr_1(20.04)))
        ))) : $rest)), $head = new n.Item(((n.geq_2($ret, "") && ($head == "=#20#01=")) ? "=#20#04=" : $head)), (fn.matches_2($head, operatorRegexp) ? bodyOp_5(opNum_1($head), $next, $lastseen, $rest, $ret) : body_3($rest, fn.concat_2($ret, $head), $lastseen)))))));

}

export function import_2($parts, $ret) /*new n.Item()*/ {

    var $rest, $maybeAt;

    return (($rest = new n.Item(fn.subsequence_2($parts, 6)),

        $maybeAt = new n.Item(n.select(fn.head_1($rest), fn.string_0())),

        (fn.matches_2($maybeAt, "at") ? block_2(fn.subsequence_2($rest, 3), fn.concat_8($ret, "core:import($,", n.select(n.filterAt_2($parts, (n.geq_2($_0, 3))), fn.string_0()), ",", n.select(n.filterAt_2($parts, (n.geq_2($_0, 5))), fn.string_0()), ",", n.select(n.filterAt_2($rest, (n.geq_2($_0, 2))), fn.string_0()), ")")) : block_2($rest, fn.concat_6($ret, "core:import($,", n.select(n.filterAt_2($parts, (n.geq_2($_0, 3))), fn.string_0()), ",", n.select(n.filterAt_2($parts, (n.geq_2($_0, 5))), fn.string_0()), ")")))));

}

export function block_2($parts, $ret) /*new n.Item()*/ {

    var $val, $rest, $no;

    return (fn.empty_1($parts) ? $ret : ($val = new n.Item(n.select(fn.head_1($parts), fn.string_0())), $rest = new n.Item(fn.tail_1($parts)), (fn.matches_2($val, operatorRegexp) ? ($no = new n.Item(opNum_1($val)), (($no == 2.14) ? xquery_2($rest, $ret) : (($no == 2.16) ? module_2($rest, $ret) : (($no == 2.17) ? annot_2($rest, $ret) : (($no == 2.19) ? import_2($rest, $ret) : body_2($parts, $ret)))))) : (fn.matches_2($val, ";") ? (fn.empty_1($rest) ? $ret : block_2($rest, n.concat_2($ret, ","))) : body_2($parts, $ret)))));

}

export function operatorPrecedence_3($val, $operator, $ret) /*new n.Item()*/ {

    var $rev, $last, $hasPrecedingOp, $isUnaryOp, $preceeds, $name, $args, $argsize, $nargs, $pre;

    return (($rev = new n.Item(array.reverse_1($ret)),

        $last = new n.Item(array.head_1($rev)),

        $hasPrecedingOp = new n.Item((($last instanceof Map) && fn.matches_2($last("name"), operatorRegexp))),

        $isUnaryOp = new n.Item((n.geq_2(opInt_1($operator), 8) && n.Sequence((fn.empty_1($last) || n.Sequence(n.geq_2(((($hasPrecedingOp && $last("suffix")) instanceof new n.Boolean()) && $last("suffix")), fn.false_0())))))),

        $operator = new n.Item(($isUnaryOp ? unaryOp_1($operator) : $operator)),

        $preceeds = new n.Item(n.ggt_2(($hasPrecedingOp && opInt_1($operator)), opInt_1($last("name")))),

        $name = new n.Item(($preceeds ? $last("name") : $operator)),

        $args = new n.Item(($preceeds ? ($argsize = new n.Item(array.size_1($last("args"))), $nargs = new n.Item(($isUnaryOp ? n.array(n.Sequence()) : n.filterAt_2(n.geq_2($_0, $last("args")), n.Sequence(2)))), $nargs = new n.Item(($val ? array.append_2($nargs, $val) : $nargs)), ((n.ggt_2($argsize, 1) && $isUnaryOp) ? ($pre = new n.Item(($last("args")(2))), n.array(n.Sequence($last("args"), (1), n.map(n.Sequence("name", $pre("name"), "args", array.append_2($pre("args"), n.map(n.Sequence("name", $operator, "args", $nargs, "suffix", ""))), "suffix", ""))))) : n.array(n.Sequence($last("args"), (1), n.map(n.Sequence("name", $operator, "args", $nargs, "suffix", "")))))) : ($nargs = new n.Item((fn.empty_1($last) ? n.array(n.Sequence()) : n.array(n.Sequence($last)))), ($val ? array.append_2($nargs, $val) : $nargs)))),

        array.append_2(array.reverse_1(array.tail_1($rev)), n.map(n.Sequence("name", $name, "args", $args, "suffix", fn.exists_1($val))))));

}

export function toOp_1($opnum) /*new n.Item()*/ {

    return (map.contains_2(operatorMap, $opnum) ? n.concat_2("core:", operatorMap($opnum)) : n.concat_2("core:", fn.replace_3(operators($opnum), " ", "-")));

}
