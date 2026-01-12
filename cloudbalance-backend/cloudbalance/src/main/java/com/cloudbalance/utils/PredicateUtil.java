package com.cloudbalance.utils;

import java.util.List;
import java.util.function.Predicate;

public class PredicateUtil {
    private PredicateUtil(){}
    public static final Predicate<List<String>> isValuesNotPresent = values->(values==null || values.isEmpty());

}
